import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

class MockUsersRepository {
  myDB = [
    {
      email: 'a@a.com',
      password: '1234',
      name: 'kitty',
      age: 13,
    },
    {
      email: 'qqq@a.com',
      password: '0000',
      name: 'bunny',
      age: 12,
    },
  ];

  findOne({ where }) {
    const users = this.myDB.filter((el) => el.email === where.email);
    if (users.length) {
      return users[0];
    }
    return null;
  }

  save({ email, password, name, age }) {
    this.myDB.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      // imports: [TypeOrmModule],
      // controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  // describe('findOneByEmail', () => {
  //   const result = usersService.findOneByEmail({ email: 'a@a.com' });
  //   expect(result).toBe({
  //     email: 'a@a.com',
  //     name: 'kitty',
  //     ...
  //   })
  // });

  describe('create', () => {
    it('already exist email test', async () => {
      const myData = {
        email: 'a@a.com',
        password: '1234',
        name: 'kitty',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('create user test', async () => {
      const myData = {
        email: 'b@b.com',
        password: '1234',
        name: 'kitty',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      const { password, ...rest } = result;
      expect(rest).toStrictEqual({
        email: 'b@b.com',
        name: 'kitty',
        age: 13,
      });
    });
  });

  // TDD
  it('email length exceeded', async () => {
    const myData = {
      email: 'badfarwerwejirwejrwrjorjewoirj@berwewirwewojrrjejr.com',
      password: '1234',
      name: 'kitty',
      age: 13,
    };

    try {
      await usersService.create({ ...myData });
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });
});
