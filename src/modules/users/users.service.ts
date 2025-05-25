import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { BasicUserInformation } from './dto/basicUserInformation.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(newUser: RegisterDto): Promise<User> {
    const user = this.usersRepository.create({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: newUser.password,
    });

    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User> {
    const userFound = await this.usersRepository.findOne({ where: { id } });

    if (!userFound) {
      throw new NotFoundException("User doesn't exist.");
    }

    return userFound;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const users = await this.usersRepository.findBy({
      id: In(ids),
    });

    if (users.length !== ids.length) {
      throw new NotFoundException('Some user not found');
    }

    return users;
  }

  getBasicUserInformation(user: User): BasicUserInformation {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  }
}
