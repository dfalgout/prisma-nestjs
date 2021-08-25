import { InputType } from '@nestjs/graphql'
import { UserOrderByInputArg } from './user-order-by.input'
import { UserWhereInputArg } from './user-where.input'
import { UserWhereUniqueInputArg } from './user-where-unique.input'

@InputType()
export class UserListInputArg {
  skip?: number
  take?: number
  cursor?: UserWhereUniqueInputArg
  where?: UserWhereInputArg
  orderBy?: UserOrderByInputArg
}
