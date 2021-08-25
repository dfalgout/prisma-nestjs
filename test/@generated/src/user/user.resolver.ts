import { Resolver } from '@nestjs/graphql'
import { UserEntity } from '@generated/user/user.entity'
import { UserService } from './user.service'
import { UserCRUDResolver } from '@generated/user/user.resolver'

@Resolver(() => UserEntity)
export class UserResolver extends UserCRUDResolver {
  constructor(readonly userService: UserService) {
    super(userService)
  }
}
