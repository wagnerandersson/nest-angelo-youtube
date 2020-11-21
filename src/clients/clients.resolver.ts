import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';
// import { UpdateClientsInput } from './dto/update-client.input';
import * as NodeRSA from 'node-rsa';
import { env } from 'process';

let private_key = env.private_key;
const key_private = new NodeRSA(private_key);

@Resolver('Clients')
export class ClientsResolver {
  constructor(private clientsService: ClientsService) {}

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
    //const clients = await this.clientsService.findAllClients();

    const user = await this.clientsService.getClientByEmail(email);
    console.log(user);

    return user;
  }
}
