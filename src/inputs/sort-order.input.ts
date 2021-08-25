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

export const generateSortOrderType = async ({ output }) => {
  await fs.promises.mkdir(path.join(output, 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'inputs', `sort-order.input.ts`),
      sortOrderSchema(),
  )
}