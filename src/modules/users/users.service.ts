import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v2 as cloud } from 'cloudinary';
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
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.UsersRepositor.findByEmail(email);
    return user;
  }

  async upload(profile_image: Express.Multer.File, id: string) {
    cloud.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findUser = await this.UsersRepositor.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found!');
    }

    const imageUpload = await cloud.uploader.upload(
      profile_image.path,
      { resource_type: 'image' },
      (error, result) => {
        return result;
      },
    );

    const updateUser = await this.UsersRepositor.update(
      {
        profile_image: imageUpload.secure_url,
      },
      id,
    );

    return updateUser;
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
