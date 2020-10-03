import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Clients } from './clients.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientsService', () => {
    let service: ClientsService;
  
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            ClientsService,
            {
              provide: getRepositoryToken(Clients),
              useValue: mockRepository,
            },
          ],
        }).compile();
    
        service = module.get<ClientsService>(ClientsService);
      });
    
      beforeEach(() => {
        mockRepository.find.mockReset();
        mockRepository.findOne.mockReset();
        mockRepository.create.mockReset();
        mockRepository.save.mockReset();
        mockRepository.update.mockReset();
        mockRepository.delete.mockReset();
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });
});