import { Field, ID, HideField, ObjectType } from '@nestjs/graphql'

@ObjectType('User')
export class UserEntity {

  @Field(() => ID)
  id!: number

  @HideField()
  email!: string

  name: string | null
}
