import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    const response = await this.userModel.findOne({ username }).exec();

    if (!response) {
      throw new NotFoundException('User not found');
    }
    return response;
  }
}
