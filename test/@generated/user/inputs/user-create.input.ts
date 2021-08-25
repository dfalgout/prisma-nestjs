import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class UserCreateInputArg implements Prisma.UserCreateInput {
  email!: string
  name?: string
}
