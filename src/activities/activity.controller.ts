import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  async getAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  async getOne(
    @Param('id')
    id: string,
  ): Promise<Activity> {
    return this.activityService.findOneById(id);
  }

  @Get('/user/:userId')
  async getAllByUserId(
    @Param('userId')
    userId: string,
  ): Promise<Activity> {
    return this.activityService.findAllByUserId(userId);
  }

  @Post()
  async createActivity(
    @Body()
    activity: CreateActivityDto,
  ): Promise<Activity> {
    return this.activityService.create(activity);
  }

  @Put(':id')
  async updateActivity(
    @Param('id')
    id: string,
    @Body()
    activity: UpdateActivityDto,
  ): Promise<Activity> {
    return this.activityService.updateById(id, activity);
  }

  @Delete(':id')
  async deleteActivity(
    @Param('id')
    id: string,
  ): Promise<boolean> {
    return this.activityService.delete(id);
  }
}
