import * as fs from 'fs'
import * as path from 'path'

const serviceSchema = () => {
  const cls = `import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}`

  return cls
}

export const generatePrismaService = async () => {
  await fs.promises.mkdir(path.join('./generated', 'prisma'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', 'prisma', 'prisma.service.ts'),
      serviceSchema(),
  )
}