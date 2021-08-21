import * as fs from 'fs'
import * as path from 'path'

const serviceSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const entity = `${name}Entity`
  const serviceName = `${name}CRUDService`
  const whereUniqueInput = `${name}WhereUniqueInputArg`
  const listInput = `${name}ListInputArg`
  const createInput = `${name}CreateInputArg`
  const updateInput = `${name}UpdateInputArg`
  const whereUniqueInputKey = `${lowercasedName}WhereUniqueInputArg`
  const listInputKey = `${lowercasedName}ListInputArg`
  const createInputKey = `${lowercasedName}CreateInputArg`
  const updateInputKey = `${lowercasedName}UpdateInputArg`
  const cls = `import { Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ${whereUniqueInput} } from './inputs/${lowercasedName}-where-unique.input'
import { ${entity} } from './${lowercasedName}.entity'
import { ${updateInput} } from './inputs/${lowercasedName}-update.input'
import { ${listInput} } from './inputs/${lowercasedName}-list.input'
import { ${createInput} } from './inputs/${lowercasedName}-create.input'

export abstract class ${serviceName} {
  private readonly logger = new Logger(${serviceName}.name) 

  constructor(readonly prisma: PrismaService) {}

  async ${lowercasedName}(${whereUniqueInputKey}: ${whereUniqueInput}): Promise<${entity} | null> {
    try {
      return await this.prisma.${lowercasedName}.findUnique({
        where: ${whereUniqueInputKey},
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async ${lowercasedName}s(${listInputKey}: ${listInput}): Promise<${entity}[] | null> {
    try {
      return await this.prisma.${lowercasedName}.findMany(${listInputKey})
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async create${name}(${createInputKey}: ${createInput}): Promise<${entity}> {
    return this.prisma.${lowercasedName}.create({
      data: ${createInputKey},
    })
  }

  async update${name}(
    ${updateInputKey}: ${updateInput},
    ${whereUniqueInputKey}: ${whereUniqueInput}
  ): Promise<${entity} | null> {
    try {
      return await this.prisma.${lowercasedName}.update({
        data: ${updateInputKey},
        where: ${whereUniqueInputKey},
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async delete${name}(${whereUniqueInputKey}: ${whereUniqueInput}): Promise<${entity} | null> {
    try {
      return await this.prisma.${lowercasedName}.delete({
        where: ${whereUniqueInputKey},
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }
}
`
  return cls
}

export const generateService = async ({ name }) => {
  await fs.promises.mkdir(path.join('./generated', `${name.toLowerCase()}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', `${name.toLowerCase()}`, `${name.toLowerCase()}.service.ts`),
      serviceSchema({ name }),
  )
}