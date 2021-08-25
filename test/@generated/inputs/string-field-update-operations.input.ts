import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class StringFieldUpdateOperationsInputArg implements Prisma.StringFieldUpdateOperationsInput {}
