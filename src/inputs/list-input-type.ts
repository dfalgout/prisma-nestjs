import * as fs from 'fs'
import * as path from 'path'

const listInputTypeSchema = ({ name }) => {
  const lowercasedName = name.toLowerCase()
  const whereUniqueInput = `${name}WhereUniqueInputArg`
  const whereInput = `${name}WhereInputArg`
  const orderByInput = `${name}OrderByInputArg`
  const cls = `import { InputType } from '@nestjs/graphql'
import { ${orderByInput} } from './${lowercasedName}-order-by.input'
import { ${whereInput} } from './${lowercasedName}-where.input'
import { ${whereUniqueInput} } from './${lowercasedName}-where-unique.input'

@InputType()
export class ${name}ListInputArg {
  skip?: number
  take?: number
  cursor?: ${whereUniqueInput}
  where?: ${whereInput}
  orderBy?: ${orderByInput}
}
`

  return cls
}

export const generateListInputType = async ({ name, output }) => {
  await fs.promises.mkdir(path.join(output, `${name.toLowerCase()}`, 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, `${name.toLowerCase()}`, 'inputs', `${name.toLowerCase()}-list.input.ts`),
      listInputTypeSchema({ name }),
  )
}