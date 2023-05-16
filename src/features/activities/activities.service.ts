import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities, ActivitiesDocument } from 'src/core/models/activities';
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

  public async getActivitiesList() {
    const query = await this.ActivitiesModel.find({
      status: true,
      is_delete: false,
    });
    const activities = query.map((doc) => {
      const activity = doc.toJSON();
      return {
        id: activity._id,
        activities_name: activity.activities_name,
        discount_type: activity.discount_type,
        min_spend: activity.min_spend,
        is_period: activity.is_period,
        start_time: activity.start_time,
        end_time: activity.end_time,
        act_products_list: activity.act_products_list,
      };
    });
    return { activities };
  }
}
