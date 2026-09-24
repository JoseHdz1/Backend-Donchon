import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppUser } from './entities/user.entity';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepository: Repository<AppUser>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return bcrypt.hash(createUserDto.password, BCRYPT_SALT_ROUNDS).then((password) =>
      this.userRepository.save(
        this.userRepository.create({ ...createUserDto, password }),
      ),
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { password, ...fields } = updateUserDto;
    Object.assign(user, fields);
    if (password) {
      user.password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.softRemove(user);
    return { id, deleted: true };
  }
}
