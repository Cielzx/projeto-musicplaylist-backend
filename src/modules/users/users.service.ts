import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepositor: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.UsersRepositor.findByEmail(createUserDto.email);

    if (findUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.UsersRepositor.create(createUserDto);

    return user;
  }

  async findAll() {
    const users = await this.UsersRepositor.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.UsersRepositor.findOne(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.UsersRepositor.findByEmail(email);
    return user;
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
