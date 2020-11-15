import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ClientsService } from 'src/clients/clients.service';
import { Clients } from 'src/clients/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  providers: [AuthService, AuthResolver, ClientsService],
})
export class AuthModule {}
