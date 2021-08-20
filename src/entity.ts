import * as fs from 'fs'
import * as path from 'path'

import { DMMF } from "@prisma/client/runtime"

export const isAnnotatedWith = (
  instance: DMMF.Field | DMMF.Model,
  annotation: RegExp,
): boolean => {
  const { documentation = '' } = instance;
  return annotation.test(documentation);
};

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
import { ${name} } from '@prisma/client'

interface I${name} extends ${name} { }

@ObjectType('${name}')
export class ${name}Entity implements I${name} {
${orderedFields.map(field => printField(field)).join('\n')}
}
`
  return cls
}

const printField = (field) => {
  if (fieldDecorator(field)) {
    return `
  ${fieldDecorator(field)}
  ${fieldName(field)}`
  }
  return `
  ${fieldName(field)}`
}

// const fieldDecoratorType = (field) => field.isList ? `[${ScalarType(field.type)}]` : `${ScalarType(field.type)}`

const fieldDecorator = (field) => {
  if (field.isId) {
    return '@Field(() => ID)'
  }

  if (isAnnotatedWith(field, /@HideField/)) {
    return '@HideField()'
  }
}

const fieldName = (field) => `${field.name}${field.isRequired ? '!' : ''}: ${tsType(field)}`

// const ScalarType = (type) => type === 'Int' ? 'number' : type
const tsType = (field) => `${field.type === 'Int' ? 'number' : field.type.toLowerCase()}${field.isRequired ? '' : ' | null'}`

export const generateEntity = async ({ name, fields }) => {
  await fs.promises.mkdir(path.join('./generated', `${name.toLowerCase()}`), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', `${name.toLowerCase()}`, `${name.toLowerCase()}.entity.ts`),
      entitySchema({ name, fields }),
  )
}