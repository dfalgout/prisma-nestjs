import { NotFoundException, PreconditionFailedException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserCRUDService } from './user.service'
import { UserEntity } from './user.entity'
import { UserWhereUniqueInputArg } from './inputs/user-where-unique.input'
import { UserListInputArg } from './inputs/user-list.input'
import { UserCreateInputArg } from './inputs/user-create.input'
import { UserUpdateInputArg } from './inputs/user-update.input'

@Resolver(() => UserEntity)
export abstract class UserCRUDResolver {
  constructor(
    readonly userService: UserCRUDService,
  ) {}

  @Query(() => UserEntity)
  async user(
    @Args('input') userWhereUniqueInputArg: UserWhereUniqueInputArg,
  ): Promise<UserEntity | null> {
    const user = await this.userService.user(userWhereUniqueInputArg)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  @Query(() => [UserEntity])
  async users(
    @Args('input', { nullable: true }) userListInputArg: UserListInputArg,
  ): Promise<UserEntity[]> {
    const users = await this.userService.users(userListInputArg)
    if (!users) throw new NotFoundException('No Users not found')
    return users
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('input') userCreateInputArg: UserCreateInputArg,
  ): Promise<UserEntity | null> {
    const user = await this.userService.createUser(userCreateInputArg)
    if (!user) throw new PreconditionFailedException('Failed to create User')
    return user
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('input') userUpdateInputArg: UserUpdateInputArg,
    @Args('where') userWhereUniqueInputArg: UserWhereUniqueInputArg,
  ): Promise<UserEntity | null> {
    const user = await this.userService.updateUser(userUpdateInputArg, userWhereUniqueInputArg)
    if (!user) throw new PreconditionFailedException('Failed to update User')
    return user
  }
}
