import { Module } from '@nestjs/common'
import { PrismaModule } from '@generated/prisma/prisma.module'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.graphql',
    }),
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
