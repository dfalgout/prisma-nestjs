import * as fs from 'fs'
import * as path from 'path'

const resolverSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const entity = `${name}Entity`
  const serviceName = `${lowercasedName}Service`
  const whereUniqueInput = `${name}WhereUniqueInputArg`
  const listInput = `${name}ListInputArg`
  const createInput = `${name}CreateInputArg`
  const createInputKey = `${lowercasedName}CreateInputArg`
  const userUpdateInputArg = `${name}UpdateInputArg`
  const userUpdateInputArgKey = `${lowercasedName}UpdateInputArg`
  const whereUniqueInputKey = `${lowercasedName}WhereUniqueInputArg`
  const listInputKey = `${lowercasedName}ListInputArg`
  const cls = `import { NotFoundException, PreconditionFailedException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ${name}CRUDService } from './${lowercasedName}.service'
import { ${entity} } from './${lowercasedName}.entity'
import { ${name}WhereUniqueInputArg } from './inputs/${lowercasedName}-where-unique.input'
import { ${name}ListInputArg } from './inputs/${lowercasedName}-list.input'
import { ${name}CreateInputArg } from './inputs/${lowercasedName}-create.input'
import { ${name}UpdateInputArg } from './inputs/${lowercasedName}-update.input'

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

  @Mutation(() => ${entity})
  async create${name}(
    @Args('input') ${createInputKey}: ${createInput},
  ): Promise<${entity} | null> {
    const ${lowercasedName} = await this.${serviceName}.create${name}(${createInputKey})
    if (!${lowercasedName}) throw new PreconditionFailedException('Failed to create ${name}')
    return ${lowercasedName}
  }

  @Mutation(() => ${entity})
  async update${name}(
    @Args('input') ${userUpdateInputArgKey}: ${userUpdateInputArg},
    @Args('where') ${whereUniqueInputKey}: ${whereUniqueInput},
  ): Promise<${entity} | null> {
    const ${lowercasedName} = await this.${serviceName}.update${name}(${userUpdateInputArgKey}, ${whereUniqueInputKey})
    if (!${lowercasedName}) throw new PreconditionFailedException('Failed to update ${name}')
    return ${lowercasedName}
  }
}
`

  return cls
}

export const generateResolver = async ({ name, output }) => {
  await fs.promises.mkdir(path.join(output, `${name.toLowerCase()}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, `${name.toLowerCase()}`, `${name.toLowerCase()}.resolver.ts`),
      resolverSchema({ name }),
  )
}