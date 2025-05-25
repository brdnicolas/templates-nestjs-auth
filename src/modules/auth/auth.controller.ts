import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() authDto: LoginDto) {
    const user = await this.authService.validateUser(
      authDto.email,
      authDto.password,
    );

    if (!user) {
      throw new HttpException(
        'Email or password incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authService.generateJwtToken(user.id, user.email, user.role);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new HttpException(
        'Email already used.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = await this.usersService.createUser(registerDto);

    return this.authService.generateJwtToken(
      newUser.id,
      newUser.email,
      newUser.role,
    );
  }
}
