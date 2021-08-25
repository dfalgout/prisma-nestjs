import * as fs from 'fs'
import * as path from 'path'

const nestCliSchema = () => {
  const cls = `{
  "collection": "@nestjs/schematics",
  "entryFile": "./src/main",
  "sourceRoot": ".",
  "compilerOptions": {
    "plugins": ["@nestjs/graphql"]
  }
}
`

  return cls
}

export const generateNestCli = async ({ output }) => {
  await fs.promises.mkdir(path.join(output), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'nest-cli.json'),
      nestCliSchema(),
  )
}