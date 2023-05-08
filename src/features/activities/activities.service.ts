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
    console.log('dto', dto);
    return this.ActivitiesModel.create(dto);
  }
}
