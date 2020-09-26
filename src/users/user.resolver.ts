import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await this.userService.findAllUsers();
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.userService.createUser(data);
        await this.userService.saveUser(user)
        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id') id: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = await this.userService.getUserById(id);
        const userUpdated = await this.userService.updateUser(user, data);
        await this.userService.saveUser(userUpdated);
        return userUpdated;
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Args('id') id: string
    ): Promise<boolean> {
        const user = await this.userService.getUserById(id)
        await this.userService.deleteUser(user);
        return true;
    }
}
