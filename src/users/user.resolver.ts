import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { env } from 'process';


import * as NodeRSA from 'node-rsa';



let private_key = env.private_key;
const key_private = new NodeRSA(private_key);


@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        users.map(el => {
            el.name = key_private.decrypt(el.name, 'utf8');
            el.email = key_private.decrypt(el.email, 'utf8');
        });
        return users;
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        const user = await this.userService.findUserById(id);
        user.name = key_private.decrypt(user.name, 'utf8');
        user.email = key_private.decrypt(user.email, 'utf8');
        return user;
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.userService.createUser(data);
        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id') id: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = this.userService.updateUser(id, data);
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Args('id') id: string
    ): Promise<boolean> {
        const deleted = await this.userService.deleteUser(id);
        return deleted;
    }
}
