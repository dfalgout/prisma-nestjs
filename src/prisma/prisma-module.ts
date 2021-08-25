import * as fs from 'fs'
import * as path from 'path'

const prismaModuleSchema = () => {
  const cls = `import { Global, Module } from '@nestjs/common'
  import { PrismaService } from './prisma.service'
  
  @Global()
  @Module({
    providers: [PrismaService],
    exports: [PrismaService]
  })
  export class PrismaModule {}
`

  return cls
}

export const generatePrismaModule = async ({ output }) => {
  await fs.promises.mkdir(path.join(output, 'prisma'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'prisma', 'prisma.module.ts'),
      prismaModuleSchema(),
  )
}