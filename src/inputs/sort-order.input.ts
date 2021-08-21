import * as fs from 'fs'
import * as path from 'path'

const sortOrderSchema = () => {
  const cls = `import { registerEnumType } from '@nestjs/graphql'

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, { name: 'SortOrder' })
`

  return cls
}

export const generateSortOrderType = async () => {
  await fs.promises.mkdir(path.join('./generated', 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join('./generated', 'inputs', `sort-order.input.ts`),
      sortOrderSchema(),
  )
}