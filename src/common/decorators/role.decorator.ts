import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/users/entities/user.entity';

export const Role = Reflector.createDecorator<UserRole>();
