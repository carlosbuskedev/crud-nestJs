import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto.create';
import { UpdateUserDto } from '../dto/user.dto.update';
import * as bcrypt from 'bcrypt';

@Injectable() // parecido com o @service do spring
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const createUser = this.userRepository.create(createUserDto);

    createUser.senha = await bcrypt.hash(
      createUser.senha + this.getPepper(),
      this.getRounds(),
    );

    await this.userRepository.save(createUser);

    return createUser.email;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async FindById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<User> {
    const findTodelete = await this.userRepository.findOne({ where: { id } });

    if (!findTodelete) {
      throw new NotFoundException('usuário não encontrado');
    }
    await this.userRepository.remove(findTodelete);
    return findTodelete;
  }
  async patchUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const findUserToChange = await this.userRepository.findOne({
      where: { id },
    });
    if (!findUserToChange) {
      throw new NotFoundException('usuário não encontrado');
    }

    if (updateUserDto.email !== undefined)
      findUserToChange.email = updateUserDto.email;

    if (updateUserDto.senha !== undefined) {
      findUserToChange.senha = await bcrypt.hash(
        updateUserDto.senha + this.getPepper(),
        this.getRounds(),
      );
    }
    return await this.userRepository.save(findUserToChange);
  }

  private getRounds() {
    return Number(process.env.BCRYPT_ROUNDS ?? 12);
  }
  private getPepper() {
    return process.env.BCRYPT_PEPPER ?? '';
  }
}
