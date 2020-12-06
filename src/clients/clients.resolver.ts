import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';

import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';

@Resolver('Clients')
export class ClientsResolver {
  constructor(private clientsService: ClientsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Clients])
  async clients(): Promise<Clients[]> {
    const clients = await this.clientsService.findAllClients();
    return clients;
  }

  @Mutation(() => Clients)
  async createClients(@Args('data') data: CreateClientInput): Promise<Clients> {
    const clients = await this.clientsService.createClient(data);
    return clients;
  }

  @Query(() => Clients)
  async clientByEmail(@Args('email') email: string): Promise<Clients> {
    const client = await this.clientsService.getClientByEmail(email);
    console.log(client);

    return client;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Clients)
  async clientsById(@Args('id') id: string): Promise<Clients> {
    const client = await this.clientsService.findClientsById(id);
    console.log(client);

    return client;
  }
}
