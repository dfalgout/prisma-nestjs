import * as fs from 'fs'
import * as path from 'path'

const entityModuleSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const cls = `import { Module } from '@nestjs/common'
import { ${name}Service } from './${lowercasedName}.service'
import { ${name}Resolver } from './${lowercasedName}.resolver'

@Module({
  providers: [${name}Service, ${name}Resolver],
})
export class ${name}Module {}
`

  return cls
}

export const generateEntityModuleSchema = async ({ name, output }) => {
  const lowercasedName = name.toLowerCase()
  await fs.promises.mkdir(path.join(output, 'src', `${lowercasedName}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'src', `${lowercasedName}`, `${lowercasedName}.module.ts`),
      entityModuleSchema({ name }),
  )
}