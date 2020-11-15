import { Field, ObjectType } from '@nestjs/graphql';
import { Clients } from 'src/clients/clients.entity';

@ObjectType()
export class AuthType {
  @Field(() => Clients)
  client: Clients;
  token: string;
}
