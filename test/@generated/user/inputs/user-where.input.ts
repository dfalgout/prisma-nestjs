import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class UserWhereInputArg implements Prisma.UserWhereInput {
  email!: string
  name?: string
}
