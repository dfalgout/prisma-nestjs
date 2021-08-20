import * as fs from 'fs'
import * as path from 'path'

const prismaModuleSchema = () => {
  const cls = `import { Module } from '@nestjs/common'
  import { PrismaService } from './prisma.service'
  
  @Module({
    providers: [
      PrismaService
    ],
    exports: [
      PrismaService
    ]
  })
  export class PrismaModule {}
`

  return cls
}

export const generatePrismaModule = async () => {
  await fs.promises.mkdir(path.join('./generated', 'prisma'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', 'prisma', 'prisma.module.ts'),
      prismaModuleSchema(),
  )
}