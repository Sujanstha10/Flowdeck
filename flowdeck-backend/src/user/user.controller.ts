import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { successResponse } from 'src/common/helper/response.helper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.ADMIN)
  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();

    return successResponse('Users fetched successfully', users, users.length);
  }
  @Get('/:id')
  async getUserSingleUser(@Param('id') id: string) {
    const users = await this.userService.getUserSingleUser(id);

    return successResponse('Users fetched successfully', users);
  }
}
