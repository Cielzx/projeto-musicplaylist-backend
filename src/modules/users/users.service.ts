import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepositor: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.UsersRepositor.create(createUserDto);

    return user;
  }

  async findAll() {
    const users = await this.UsersRepositor.findAll();
    return users;
  }

  async findOne(id: string) {
    const users = await this.UsersRepositor.findOne(id);
    return users;
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    const userData = await this.UsersRepositor.update(updateUserDto, id);
    return userData;
  }

  async remove(id: string) {
    await this.UsersRepositor.delete(id);
    return;
  }
}
