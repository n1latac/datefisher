import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SuccessResponseDTO } from '../../responses';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() data: CreateUserDto): Promise<SuccessResponseDTO> {
    return this.userService.createUser(data);
  }
}
