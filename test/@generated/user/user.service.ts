import { Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserWhereUniqueInputArg } from './inputs/user-where-unique.input'
import { UserEntity } from './user.entity'
import { UserUpdateInputArg } from './inputs/user-update.input'
import { UserListInputArg } from './inputs/user-list.input'
import { UserCreateInputArg } from './inputs/user-create.input'

export abstract class UserCRUDService {
  private readonly logger = new Logger(UserCRUDService.name) 

  constructor(readonly prisma: PrismaService) {}

  async user(userWhereUniqueInputArg: UserWhereUniqueInputArg): Promise<UserEntity | null> {
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInputArg,
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async users(userListInputArg: UserListInputArg): Promise<UserEntity[] | null> {
    try {
      return await this.prisma.user.findMany(userListInputArg)
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async createUser(userCreateInputArg: UserCreateInputArg): Promise<UserEntity> {
    return this.prisma.user.create({
      data: userCreateInputArg,
    })
  }

  async updateUser(
    userUpdateInputArg: UserUpdateInputArg,
    userWhereUniqueInputArg: UserWhereUniqueInputArg
  ): Promise<UserEntity | null> {
    try {
      return await this.prisma.user.update({
        data: userUpdateInputArg,
        where: userWhereUniqueInputArg,
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async deleteUser(userWhereUniqueInputArg: UserWhereUniqueInputArg): Promise<UserEntity | null> {
    try {
      return await this.prisma.user.delete({
        where: userWhereUniqueInputArg,
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }
}
