import * as fs from 'fs'
import * as path from 'path'

const nestCliSchema = () => {
  const cls = `{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@nestjs/graphql"]
  }
}
`

  return cls
}

export const generateNestCli = async () => {
  await fs.promises.mkdir(path.join('./generated', 'override'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', 'override', 'nest-cli.json'),
      nestCliSchema(),
  )
}