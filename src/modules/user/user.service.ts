import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { SuccessResponseDTO } from '../../responses';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';
import { ApiValidationException } from '../../exceptions/apiValidationException';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private readonly authService: AuthService,
  ) {}

  async createUser(data: CreateUserDto) {
    return await this.authService.signUp(data);
  }

  async login(data: CreateUserDto) {
    return await this.authService.signIn(data);
  }
}
