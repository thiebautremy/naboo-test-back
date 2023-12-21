import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from './schemas/activity.schema';
import mongoose from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: mongoose.Model<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    const activities = await this.activityModel.find();
    return activities;
  }

  async findOneById(id: string): Promise<Activity> {
    const activity = await this.activityModel.findById(id);

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return activity;
  }

  async findAllByUserId(userId: string): Promise<any> {
    const activities = await this.activityModel.find();

    const activitiesByUser = activities.filter(
      (activity) => activity.createdBy === userId,
    );

    if (!activitiesByUser) {
      throw new NotFoundException('No activity found');
    }
    return activitiesByUser;
  }

  async updateById(id: string, activity: Activity): Promise<Activity> {
    const activityUpdated = await this.activityModel.findByIdAndUpdate(
      id,
      activity,
      {
        new: true,
        runValidators: true,
      },
    );
    return activityUpdated;
  }

  async create(activity: Activity): Promise<Activity> {
    const response = await this.activityModel.create(activity);
    return response;
  }

  async delete(id: string): Promise<boolean> {
    const response = await this.activityModel.findByIdAndDelete(id);

    if (!response) {
      throw new NotFoundException('Activity not found');
    }
    return true;
  }
}
