import { printField, isAnnotatedWith } from './utils/field-helpers';
import * as fs from 'fs'
import * as path from 'path'

import { DMMF } from "@prisma/client/runtime"

const entitySchema = ({ name, fields }) => {
  const indexField = fields.findIndex((field) => field.isId === true)
  let containsHideField = false
  let orderedFields: DMMF.Field[] = []
  fields.forEach((field: DMMF.Field, index) => {
      if (!containsHideField) containsHideField = isAnnotatedWith(field, /@HideField/)
      if (index === indexField) {
          orderedFields = [field, ...orderedFields]
      } else {
          orderedFields.push(field)
      }
  })
  const cls = `import { Field, ID,${containsHideField ? ' HideField,' : ''} ObjectType } from '@nestjs/graphql'

@ObjectType('${name}')
export class ${name}Entity {
${orderedFields.map(field => printField(field)).join('\n')}
}
`
  return cls
}

export const generateEntity = async ({ name, fields }) => {
  await fs.promises.mkdir(path.join('./generated', `${name.toLowerCase()}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', `${name.toLowerCase()}`, `${name.toLowerCase()}.entity.ts`),
      entitySchema({ name, fields }),
  )
}