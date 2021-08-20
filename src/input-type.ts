import * as fs from 'fs'
import * as path from 'path'

const inputTypeSchema = ({ name }) => {
  const whereUniqueInput = `${name}WhereUniqueInput`
  const whereInput = `${name}WhereInput`
  const orderByInput = `${name}OrderByInput`
  const cls = `import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class ${name}ListInput {
  skip?: number
  take?: number
  cursor?: Prisma.${whereUniqueInput}
  where?: Prisma.${whereInput}
  orderBy?: Prisma.${orderByInput}
}
`

  return cls
}

export const generateInputType = async ({ name }) => {
  await fs.promises.mkdir(path.join('./generated', `${name.toLowerCase()}`, 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', `${name.toLowerCase()}`, 'inputs', `${name.toLowerCase()}-list.input.ts`),
      inputTypeSchema({ name }),
  )
}