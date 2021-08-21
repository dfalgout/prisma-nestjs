import * as fs from 'fs'
import * as path from 'path'

const resolverSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const entity = `${name}Entity`
  const serviceName = `${lowercasedName}Service`
  const whereUniqueInput = `${name}WhereUniqueInputArg`
  const listInput = `${name}ListInputArg`
  const whereInput = `${name}WhereInputArg`
  const orderByInput = `${name}OrderByInputArg`
  const whereUniqueInputKey = `${lowercasedName}WhereUniqueInputArg`
  const listInputKey = `${lowercasedName}ListInputArg`
  const cls = `import { NotFoundException, PreconditionFailedException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ${name}CRUDService } from './${lowercasedName}.service'
import { ${entity} } from './${lowercasedName}.entity'
import { UserWhereUniqueInputArg } from './inputs/user-where-unique.input'
import { ${name}ListInputArg } from './inputs/${lowercasedName}-list.input'

@Resolver(() => ${entity})
export abstract class ${name}CRUDResolver {
  constructor(
    readonly ${serviceName}: ${name}CRUDService,
  ) {}

  @Query(() => ${entity})
  async ${lowercasedName}(
    @Args('input') ${whereUniqueInputKey}: ${whereUniqueInput},
  ): Promise<${entity} | null> {
    const ${lowercasedName} = await this.${serviceName}.${lowercasedName}(${whereUniqueInputKey})
    if (!${lowercasedName}) throw new NotFoundException('${name} not found')
    return ${lowercasedName}
  }

  @Query(() => [${entity}])
  async ${lowercasedName}s(
    @Args('input', { nullable: true }) ${listInputKey}: ${listInput},
  ): Promise<${entity}[]> {
    const ${lowercasedName}s = await this.${serviceName}.${lowercasedName}s(${listInputKey})
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