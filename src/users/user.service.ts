import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();        
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id);    
        if(!user) {
            throw new NotFoundException('User not found');
        }    
        return user;
    }

    async createUser(data: CreateUserInput): Promise<User> {
        return this.userRepository.create(data);
    }

    async updateUser(user: User, data: UpdateUserInput): Promise<User> {
        return await this.createUser({ ...user, ...data })
    }

    async deleteUser(user: User): Promise<void> {
        const userDeleted = await this.userRepository.delete(user);
        if(!userDeleted) {
          throw new InternalServerErrorException('Problem to delete a user. Try again');
        }
    }

    async saveUser(user: User): Promise<User> {
      const userSaved = this.userRepository.save(user);
      if(!userSaved) {
        throw new InternalServerErrorException('Problem to create a user. Try again');
      }
      return userSaved
    }
}
