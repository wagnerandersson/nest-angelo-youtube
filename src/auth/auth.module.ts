import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ClientsService } from 'src/clients/clients.service';
import { Clients } from 'src/clients/clients.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clients]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '5min',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, ClientsService, JwtStrategy],
})
export class AuthModule {}
