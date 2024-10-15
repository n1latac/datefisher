import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { SuccessResponseDTO } from '../../responses';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserService) {}

  async createUser(data: CreateUserDto) {
    return new SuccessResponseDTO();
  }
}
