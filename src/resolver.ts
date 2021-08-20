import * as fs from 'fs'
import * as path from 'path'

const resolverSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const entity = `${name}Entity`
  const serviceName = `${lowercasedName}Service`
  const whereUniqueInput = `${name}WhereUniqueInput`
  const listInput = `${name}ListInput`
  const whereInput = `${name}WhereInput`
  const orderByInput = `${name}OrderByInput`
  const cls = `import { NotFoundException, PreconditionFailedException, Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ${name}Service } from './${lowercasedName}.service'
import { ${entity} } from './${lowercasedName}.entity'
import { ${name}ListInput } from './inputs/${lowercasedName}-list.input'
import { Prisma } from '@prisma/client'

@Resolver(() => ${entity})
export class ${name}Resolver {
  private readonly logger = new Logger(${name}Resolver.name)

  constructor(
    private readonly ${serviceName}: ${name}Service,
  ) {}

  @Query(() => ${entity})
  async ${lowercasedName}(
    @Args('input') input: Prisma.${whereUniqueInput},
  ): Promise<${entity} | null> {
    const ${lowercasedName} = await this.${serviceName}.${lowercasedName}(input)
    if (!${lowercasedName}) throw new NotFoundException('${name} not found')
    return ${lowercasedName}
  }

  @Query(() => [${entity}])
  async ${lowercasedName}s(
    @Args('input') input: ${listInput},
  ): Promise<${entity}[]> {
    const ${lowercasedName}s = await this.${serviceName}.${lowercasedName}s(input)
    if (!${lowercasedName}s) throw new NotFoundException('No ${name}s not found')
    return ${lowercasedName}s
  }
}
`

  return cls
}

export const generateResolver = async ({ name }) => {
  await fs.promises.mkdir(path.join('./generated', `${name.toLowerCase()}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', `${name.toLowerCase()}`, `${name.toLowerCase()}.resolver.ts`),
      resolverSchema({ name }),
  )
}