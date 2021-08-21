import { DMMF } from '@prisma/client/runtime'

export const isAnnotatedWith = (
  instance: DMMF.Field | DMMF.Model,
  annotation: RegExp,
): boolean => {
  const { documentation = '' } = instance;
  return annotation.test(documentation);
};

export const printField = (field) => {
  if (fieldDecorator(field)) {
    return `
  ${fieldDecorator(field)}
  ${fieldName(field)}`
  }
  return `
  ${fieldName(field)}`
}

export const fieldDecorator = (field) => {
  if (field.isId) {
    return '@Field(() => ID)'
  }

  if (isAnnotatedWith(field, /@HideField/)) {
    return '@HideField()'
  }
}

export const fieldNameOptionalOnly = (field) => `${field.name}${field.isRequired ? '!' : '?'}`

export const fieldNameOptional = (field) => `${field.name}${field.isRequired ? '!' : '?'}: ${tsType(field)}`
export const tsType = (field) => `${field.type === 'Int' ? 'number' : field.type.toLowerCase()}`

export const fieldName = (field) => `${field.name}${field.isRequired ? '!' : ''}: ${tsTypeOptional(field)}`
export const tsTypeOptional = (field) => `${field.type === 'Int' ? 'number' : field.type.toLowerCase()}${field.isRequired ? '' : ' | null'}`