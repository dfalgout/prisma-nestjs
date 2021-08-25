import * as fs from 'fs'
import * as path from 'path'

const entityServiceSchema = ({ name, output }) => {
  const outputDir = output.split(path.sep).pop()
  const lowercasedName = name.toLowerCase()
  const cls = `import { Injectable } from '@nestjs/common'
import { PrismaService } from '${outputDir}/prisma/prisma.service'
import { ${name}CRUDService } from '${outputDir}/${lowercasedName}/${lowercasedName}.service'

@Injectable()
export class ${name}Service extends ${name}CRUDService {
  constructor(readonly prisma: PrismaService) {
    super(prisma)
  }
}
`

  return cls
}

export const generateEntityServiceSchema = async ({ name, output }) => {
  const lowercasedName = name.toLowerCase()
  await fs.promises.mkdir(path.join(output, 'src', `${lowercasedName}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'src', `${lowercasedName}`, `${lowercasedName}.service.ts`),
      entityServiceSchema({ name, output }),
  )
}