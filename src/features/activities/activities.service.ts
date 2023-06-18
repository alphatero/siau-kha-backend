import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities, ActivitiesDocument } from 'src/core/models/activities';
import { Role } from 'src/core/models/user';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activities.name)
    private readonly ActivitiesModel: Model<ActivitiesDocument>,
  ) {}

  public async createActivity(dto: CreateActivityDto) {
    return this.ActivitiesModel.create(dto);
  }

  public async getActivitiesList(role: string) {
    let query;
    if (role === Role.ADMIN || role === Role.MANAGER) {
      query = await this.ActivitiesModel.find({
        is_delete: false,
      });
    } else {
      const currentDate = new Date();
      query = await this.ActivitiesModel.find({
        start_time: { $lte: currentDate },
        end_time: { $gte: currentDate },
        status: true,
        is_delete: false,
      });
    }

    const activities = query.map((doc) => {
      const activity = doc.toJSON();
      return {
        id: activity._id,
        activities_name: activity.activities_name,
        discount_type: activity.discount_type,
        charge_type: activity.charge_type,
        min_spend: activity.min_spend,
        discount: activity.discount,
        is_period: activity.is_period,
        start_time: activity.start_time,
        end_time: activity.end_time,
        act_products_list: activity.act_products_list,
      };
    });
    return { activities };
  }
}
