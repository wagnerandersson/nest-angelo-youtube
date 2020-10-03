import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';
// import { UpdateClientsInput } from './dto/update-client.input';

@Resolver('Clients')
export class ClientsResolver {
    constructor(
        private clientsService: ClientsService
    ){}

    @Query(() => [Clients])
    async clients(): Promise<Clients[]> {
        const clients = await this.clientsService.findAllClients();
        return clients;
    }

    @Mutation(() => Clients)
    async createClients(
        @Args('data') data: CreateClientInput
    ): Promise<Clients> {
        const clients = await this.clientsService.createClient(data);
        return clients;
    }
}