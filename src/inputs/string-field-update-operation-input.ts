import * as fs from 'fs'
import * as path from 'path'

const stringFieldUpdateOperationsInputSchema = () => {
  const cls = `import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class StringFieldUpdateOperationsInputArg implements Prisma.StringFieldUpdateOperationsInput {}
`

  return cls
}

export const generateStringFieldUpdateOperationsInputType = async ({ output }) => {
  await fs.promises.mkdir(path.join(output, 'inputs'), {
    recursive: true,
  })
  await fs.promises.writeFile(
      path.join(output, 'inputs', 'string-field-update-operations.input.ts'),
      stringFieldUpdateOperationsInputSchema(),
  )
}