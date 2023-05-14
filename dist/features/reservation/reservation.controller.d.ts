import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/check-in-reservation.dto';
import { ReservationStatus } from 'src/core/models/reservation';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    createReservation(request: any, dto: CreateReservationDto): Promise<void>;
    getReservation(): Promise<{
        reservation_list: {
            id: any;
            name: string;
            customer_num: number;
            create_time: Date;
            status: ReservationStatus;
        }[];
    }>;
    arrangeSetting(id: string): Promise<void>;
    deleteReservation(id: string): Promise<void>;
}
