import * as fs from 'fs'
import * as path from 'path'

const appModuleSchema = ({ names, output }) => {
  const outputDir = output.split(path.sep).pop()
  const modules = names.map((name, idx) => {
    const lowercasedName = name.toLowerCase()
    return {
      import: `import { ${name}Module } from './${lowercasedName}/${lowercasedName}.module'\n`,
      name: `${name}Module${idx === names.length-1 ? ',' : ',\n'}`
    }
  })
  const cls = `import { Module } from '@nestjs/common'
import { PrismaModule } from '${outputDir}/prisma/prisma.module'
import { GraphQLModule } from '@nestjs/graphql'
${modules.map(module => module.import)}
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.graphql',
    }),
    PrismaModule,
    ${modules.map(module => module.name)}
  ],
})
export class AppModule {}
`

  return cls
}

export const generateAppModuleSchema = async ({ names, output }) => {
  await fs.promises.mkdir(path.join(output, 'src'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'src', 'app.module.ts'),
      appModuleSchema({ names, output }),
  )
}