import { fieldNameOptionalOnly } from './../utils/field-helpers'
import * as fs from 'fs'
import * as path from 'path'

const orderByInputSchema = ({ name, fields, output }) => {
  const outputDir = output.split(path.sep).pop()
  const cls = `import { SortOrder } from '${outputDir}/inputs/sort-order.input'
import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class ${name}OrderByInputArg implements Prisma.${name}OrderByInput {
${fields.map(field => `  ${fieldNameOptionalOnly(field)}: SortOrder`).join('\n')}
}
`

  return cls
}

export const generateOrderByInputType = async ({ name, fields, output }) => {
  await fs.promises.mkdir(path.join(output, `${name.toLowerCase()}`, 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, `${name.toLowerCase()}`, 'inputs', `${name.toLowerCase()}-order-by.input.ts`),
      orderByInputSchema({ name, fields, output }),
  )
}