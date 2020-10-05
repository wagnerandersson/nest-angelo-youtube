import { User } from './../../users/user.entity';
import { Clients } from './../../clients/clients.entity';

export default class TestUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Angelo Luz';
    user.id = '1';
    return user;
  }

  static giveAMeAValidClient(): Clients {
    const client = new Clients();
    client.id = '1';
    client.name = 'Lázaro Pereira';
    client.phone = '53-98802937'
    client.email = 'lazaro@gmail.com';
    return client;
  }
}
