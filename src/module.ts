import * as fs from 'fs'
import * as path from 'path'

const moduleSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const serviceName = `${name}Service`
  const resolverName = `${name}Resolver`
  const cls = `import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ${serviceName} } from './${lowercasedName}.service'
import { ${resolverName} } from './${lowercasedName}.resolver'
  
@Module({
  providers: [
    ${serviceName},
    ${resolverName},
    PrismaService
  ],
  exports: [
    ${serviceName},
  ]
})
export class ${name}Module {}
`

  return cls
}

export const generateModule = async ({ name }) => {
  await fs.promises.mkdir(path.join('./generated', `${name.toLowerCase()}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', `${name.toLowerCase()}`, `${name.toLowerCase()}.module.ts`),
      moduleSchema({ name }),
  )
}