import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class UserWhereUniqueInputArg implements Prisma.UserWhereUniqueInput {
  email!: string
  name?: string
}
