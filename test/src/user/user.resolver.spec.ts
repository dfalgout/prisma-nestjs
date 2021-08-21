import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserEntity } from 'generated/user/user.entity';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  const user1 = new UserEntity();
  user1.email = 'dustin@email.com';
  user1.id = 1234;
  user1.name = 'Dustin';

  const user2 = new UserEntity();
  user2.email = 'peter@email.com';
  user2.id = 5678;
  user2.name = 'Peter';

  const userService = {
    user: () => user1,
    users: () => [user1, user2],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    userResolver = app.get<UserResolver>(UserResolver);
  });

  describe('users', () => {
    it('should return some users', async () => {
      const users = await userResolver.users({});
      expect(users).toStrictEqual([user1, user2]);
    });
  });

  describe('user', () => {
    it('should return a single user', async () => {
      const users = await userResolver.user({ email: 'foo' });
      expect(users).toStrictEqual(user1);
    });
  });
});
