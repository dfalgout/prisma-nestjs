import { fieldNameOptional } from './../utils/field-helpers'
import * as fs from 'fs'
import * as path from 'path'

import { DMMF } from '@prisma/client/runtime'

const whereUniqueInputSchema = ({ name, fields }) => {
  const indexField = fields.findIndex((field) => field.isId === true)
  let orderedFields: DMMF.Field[] = []
  fields.forEach((field: DMMF.Field, index) => {
    if (index !== indexField) {
      orderedFields.push(field)
    }
  })
  const cls = `import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class ${name}WhereUniqueInputArg implements Prisma.${name}WhereUniqueInput {
${orderedFields.map(field => `  ${fieldNameOptional(field)}`).join('\n')}
}
`

  return cls
}

export const generateWhereUniqueInputType = async ({ name, fields, output }) => {
  await fs.promises.mkdir(path.join(output, `${name.toLowerCase()}`, 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, `${name.toLowerCase()}`, 'inputs', `${name.toLowerCase()}-where-unique.input.ts`),
      whereUniqueInputSchema({ name, fields }),
  )
}