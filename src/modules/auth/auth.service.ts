import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity';
import { JwtPayload } from './guards/jwt.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<JwtPayload | null> {
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordMatch = user && bcrypt.compareSync(password, user.password);

    if (isPasswordMatch) {
      return user;
    }

    return null;
  }

  async generateJwtToken(id: string, email: string, role: UserRole) {
    const payload = { id, email, role };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
