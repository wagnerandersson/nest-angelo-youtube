import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './user.entity';
import { UserService } from './user.service';
import { mockAddAccountParams, mockUpdateUserParams, mockUpdatedUserModel, mockUserModel, mockUserArrayModel } from './../common/test/TestUtil';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockUserArrayModel),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn().mockReturnValue(mockUserModel),
    save: jest.fn().mockReturnValue(mockUserModel),
    update: jest.fn().mockReturnValue(mockUpdatedUserModel),
    delete: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all Users', () => {
    it('Should list all users', async () => {
      const users = service.findAllUsers();

      expect(users).resolves.toBe(mockUserArrayModel)
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search User By Id', () => {
    it('Should find a existing user', async () => {
      const userFound = service.getUserById('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id)
      expect(userFound).resolves.toBe(mockUserModel)
    });
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const user = service.getUserById('3')

      expect(user).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith('3');
    });
  });

  describe('When create a user', () => {
    it('Should create a user', async () => {
      const user = service.createUser(mockAddAccountParams)

      expect(mockRepository.create).toBeCalledWith(mockAddAccountParams);
      expect(user).resolves.toBe(mockUserModel)
    });
  });

  describe('When update User', () => {
    it('Should update a user', async () => {
      service.createUser = jest.fn()

      const userUpdated = service.updateUser(mockUserModel, mockUpdateUserParams)

      expect(service.createUser).toHaveBeenCalledWith({ ...mockUserModel, ...mockUpdateUserParams });
      expect(userUpdated).resolves.toBe(mockUpdatedUserModel)
    });

    describe('When delete User', () => {
      it('Should delete a existing user', async () => {
        mockRepository.delete.mockReturnValue({ affected: 1 })

        await service.deleteUser(mockUserModel);

        expect(mockRepository.delete).toBeCalledWith(mockUserModel);
      });

      it('Should return an internal server error if repository does not delete the user', async () => {
        mockRepository.delete.mockReturnValue(null);

        expect(service.deleteUser(mockUserModel)).rejects.toThrow(InternalServerErrorException)

        expect(mockRepository.delete).toBeCalledWith(mockUserModel);
      })
    });

    describe('When save a user', () => {
      it('Should save a user with valid data', async () => {
        expect(service.saveUser(mockUserModel)).resolves.toBe(mockUserModel)

        expect(mockRepository.save).toHaveBeenCalledWith(mockUserModel)
      })
      it('Should return an internal server error if repository does not save the user', async () => {
        mockRepository.save.mockRejectedValue('Generic error')
        
        expect(service.saveUser(mockUserModel)).rejects.toThrow(InternalServerErrorException)

        expect(mockRepository.save).toHaveBeenCalledWith(mockUserModel)
      })
    })
  })
})
