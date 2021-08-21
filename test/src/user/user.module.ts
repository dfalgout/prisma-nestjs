import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
