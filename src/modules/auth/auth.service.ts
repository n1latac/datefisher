import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { ApiValidationException } from '../../exceptions/apiValidationException';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponseDTO } from '../../responses';
import { CreateUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  protected async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash: string = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  async getUserAccessToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  protected async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  }

  async signIn(data: { email: string; password: string }) {
    const { email, password } = data;

    const isExist = await this.userRepo.scope(null).findOne({
      where: { email },
    });
    if (!isExist) {
      throw new UnauthorizedException({
        message: 'Email or password is incorrect',
      });
    }

    const isPasswordMatch = await this.comparePassword(
      password,
      isExist.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException({
        message: 'Email or passwords is incorrect',
      });
    }

    const { access_token } = await this.getUserAccessToken(isExist);

    const user = isExist.toJSON();
    delete user.password;

    return new SuccessResponseDTO({ access_token, user });
  }

  async signUp(data: CreateUserDto): Promise<SuccessResponseDTO> {
    const { email, password, first_name, last_name, role = 'User' } = data;

    const isExist = await this.userRepo.findOne({ where: { email } });
    if (isExist) {
      console.log('here');
      throw new UnauthorizedException({
        message: 'User with such email already exists',
      });
    }

    const passwordHash = await this.hashPassword(password);

    await this.userRepo.create({
      email,
      password: passwordHash,
      first_name,
      last_name,
      role,
    });

    const user = await this.userRepo.findOne({ where: { email } });

    const { access_token } = await this.getUserAccessToken(user);

    return new SuccessResponseDTO({ access_token, user });
  }
}
