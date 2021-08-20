import * as fs from 'fs'
import * as path from 'path'

const serviceSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const entity = `${name}Entity`
  const serviceName = `${name}Service`
  const whereUniqueInput = `${name}WhereUniqueInput`
  const whereInput = `${name}WhereInput`
  const orderByInput = `${name}OrderByInput`
  const createInput = `${name}CreateInput`
  const updateInput = `${name}UpdateInput`
  const cls = `import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { ${entity} } from './${lowercasedName}.entity'

@Injectable()
export class ${serviceName} {
  private readonly logger = new Logger(${serviceName}.name) 

  constructor(private prisma: PrismaService) {}

  async ${lowercasedName}(${lowercasedName}WhereUniqueInput: Prisma.${whereUniqueInput}): Promise<${entity} | null> {
    try {
      return this.prisma.${lowercasedName}.findUnique({
        where: ${lowercasedName}WhereUniqueInput,
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async ${lowercasedName}s(params: {
    skip?: number
    take?: number
    cursor?: Prisma.${whereUniqueInput}
    where?: Prisma.${whereInput}
    orderBy?: Prisma.${orderByInput}
  }): Promise<${entity}[]> {
    const { skip, take, cursor, where, orderBy } = params

    try {
      return this.prisma.${lowercasedName}.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async create${name}(data: Prisma.${createInput}): Promise<${entity}> {
    return this.prisma.${lowercasedName}.create({
      data,
    })
  }

  async update${name}(params: {
    where: Prisma.${whereUniqueInput}
    data: Prisma.${updateInput}
  }): Promise<${entity}> {
    const { where, data } = params

    try {
      return this.prisma.${lowercasedName}.update({
        data,
        where,
      })
    } catch (e) {
      this.logger.error(e)
    }
    return null
  }

  async delete${name}(where: Prisma.${whereUniqueInput}): Promise<${entity}> {
    try {
      return this.prisma.${lowercasedName}.delete({
        where,
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