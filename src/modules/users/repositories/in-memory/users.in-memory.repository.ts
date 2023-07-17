import { UpdateMusicDto } from 'src/modules/music/dto/update-music.dto';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

export class UsersInMemoryRepository implements UsersRepository {
  private database: User[] = [];
  findAll(): User[] | Promise<User[]> {
    return plainToInstance(User, this.database);
  }

  findOne(id: string): User | Promise<User> {
    const user = this.database.find((user) => user.id === id);
    return plainToInstance(User, user);
  }

  findByEmail(email: string): User | Promise<User> {
    const user = this.database.find((user) => user.email === email);
    return user;
  }

  update(data: UpdateUserDto, id: string): User | Promise<User> {
    const userIndex = this.database.findIndex((user) => user.id === id);
    this.database[userIndex] = {
      ...this.database[userIndex],
      ...data,
    };

    return plainToInstance(User, this.database[userIndex]);
  }

  delete(id: string): void | Promise<void> {
    const userIndex = this.database.findIndex((user) => user.id === id);
    this.database.splice(userIndex);
  }

  create(data: CreateUserDto): User | Promise<User> {
    const newUser = new User();
    Object.assign(newUser, {
      ...data,
    });

    this.database.push(newUser);

    return plainToInstance(User, newUser);
  }
}
