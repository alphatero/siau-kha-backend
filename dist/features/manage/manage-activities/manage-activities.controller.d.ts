import { ManageActivitiesService } from './manage-activities.service';
import { CreateManageActivityDto, UpdateManageActivityDto } from './dto';
export declare class ManageActivitiesController {
    private readonly manageActivitiesService;
    constructor(manageActivitiesService: ManageActivitiesService);
    getActivitiesList(): Promise<{
        act_list: {
            id: any;
            activities_name: string;
            discount_type: string;
            charge_type: string;
            min_spend: number;
            discount: number;
            is_period: boolean;
            start_time: Date;
            end_time: Date;
            act_products_list: {
                id: any;
                product_name: string;
                product_type: string;
                product_price: number;
            }[];
            status: boolean;
        }[];
    }>;
    createActivities(dto: CreateManageActivityDto): Promise<void>;
    updateActivities(actId: string, dto: UpdateManageActivityDto): Promise<void>;
    deleteActivities(actId: string): Promise<void>;
}
