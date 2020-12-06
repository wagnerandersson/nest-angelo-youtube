import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { Clients } from 'src/clients/clients.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private clientsService: ClientsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: Clients['id']; name: string }) {
    console.log(payload);
    const client = this.clientsService.findClientsById(payload.sub);

    console.log(client);
    if (!client) {
      throw new UnauthorizedException('Unauthorized');
    }
    return { clientId: payload.sub, clientname: payload.name };
  }
}
