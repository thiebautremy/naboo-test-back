import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':username')
  async getOne(
    @Param('id')
    username: string,
  ): Promise<User> {
    return this.userService.findOneByUsername(username);
  }
}
