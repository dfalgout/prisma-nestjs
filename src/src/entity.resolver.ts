import * as fs from 'fs'
import * as path from 'path'

const entityResolverSchema = ({ name, output }) => {
  const outputDir = output.split(path.sep).pop()
  const lowercasedName = name.toLowerCase()
  const cls = `import { Resolver } from '@nestjs/graphql'
import { ${name}Entity } from '${outputDir}/${lowercasedName}/${lowercasedName}.entity'
import { ${name}Service } from './${lowercasedName}.service'
import { ${name}CRUDResolver } from '${outputDir}/${lowercasedName}/${lowercasedName}.resolver'

@Resolver(() => ${name}Entity)
export class ${name}Resolver extends ${name}CRUDResolver {
  constructor(readonly ${lowercasedName}Service: ${name}Service) {
    super(${lowercasedName}Service)
  }
}
`

  return cls
}

export const generateEntityResolverSchema = async ({ name, output }) => {
  const lowercasedName = name.toLowerCase()
  await fs.promises.mkdir(path.join(output, 'src', `${lowercasedName}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'src', `${lowercasedName}`, `${lowercasedName}.resolver.ts`),
      entityResolverSchema({ name, output }),
  )
}