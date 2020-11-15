import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(private clientService: ClientsService) {}

  async validateClient(data: AuthInput): Promise<AuthType> {
    const client = await this.clientService.getClientByEmail(data.email);
    console.log(client);
    const validPassword = data.pass === client.pass;

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }

    return {
      client,
      token: 'token',
    };
  }
}
