import * as fs from 'fs'
import * as path from 'path'

const nestMainSchema = () => {
  const cls = `import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from '../generated/prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(
    AppModule,
  )

  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  await app.listen(8080)
}
bootstrap()
`

  return cls
}

export const generateNestMain = async () => {
  await fs.promises.mkdir(path.join('./generated', 'override'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', 'override', 'main.ts'),
      nestMainSchema(),
  )
}