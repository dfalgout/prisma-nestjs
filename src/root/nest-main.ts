import * as fs from 'fs'
import * as path from 'path'

const nestMainSchema = ({ output }) => {
  const outputDir = output.split(path.sep).pop()
  const cls = `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from '${outputDir}/prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}
bootstrap()
`

  return cls
}

export const generateNestMain = async ({ output }) => {
  await fs.promises.mkdir(path.join(output, 'src'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'src', 'main.ts'),
      nestMainSchema({ output }),
  )
}