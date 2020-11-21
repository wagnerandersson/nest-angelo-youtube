import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Clients } from 'src/clients/clients.entity';
import { ClientsService } from 'src/clients/clients.service';
// import { UpdateClientInput } from '../clients/dto/update-client.input';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Dependencies(ClientsService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientsService,
    private JTWService: JwtService,
  ) {}

  async validateClient(data: AuthInput): Promise<AuthType> {
    const client = await this.clientService.getClientByEmail(data.email);
    console.log(client);
    const validPassword = data.pass === client.pass;

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const token = await this.jwtToken(client);

    return {
      client,
      token,
    };
  }

  private async jwtToken(client: Clients): Promise<string> {
    const payload = { clientname: client.name, sub: client.id };
    return this.JTWService.signAsync(payload);
  }
}
