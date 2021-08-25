import { SortOrder } from '@generated/inputs/sort-order.input'
import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class UserOrderByInputArg implements Prisma.UserOrderByInput {
  id!: SortOrder
  email!: SortOrder
  name?: SortOrder
}
