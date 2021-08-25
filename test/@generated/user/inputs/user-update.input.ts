import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class UserUpdateInputArg implements Prisma.UserUpdateInput {
  email!: string
  name?: string
}
