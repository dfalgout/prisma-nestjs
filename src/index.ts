import { generateStringFieldUpdateOperationsInputType } from './inputs/string-field-update-operation-input'
import { generateUpdateInputType } from './inputs/update-input'
import { generateCreateInputType } from './inputs/create-input'
import { generateWhereInputType } from './inputs/where-input'
import { generateOrderByInputType } from './inputs/order-by-input'
import { generateWhereUniqueInputType } from './inputs/where-unique-input'
import { generateListInputType } from './inputs/list-input-type'
import { generateSortOrderType } from './inputs/sort-order.input'
import { generateResolver } from './resolver'
import { generateNestMain } from './nest-main'
import { generatePrismaService } from './prisma-service'
import { generateService } from './service'
import { generateEntity } from './entity'
import { generatePrismaModule } from './prisma-module'
import { generatorHandler } from '@prisma/generator-helper'
import { generateNestCli } from './nest-cli'

generatorHandler({
    onManifest() {
        return {
            defaultOutput: './generated',
            prettyName: 'Prisma NestJS GraphQL Generator',
        }
    },
    async onGenerate(options) {
        const { models } = options.dmmf.datamodel
        try {
            await generatePrismaModule()
            await generatePrismaService()
            // await generateNestMain()
            // await generateNestCli()
            await generateStringFieldUpdateOperationsInputType()
            await generateSortOrderType()
            await Promise.all(
                models.map(async model => {
                    const { name, fields } = model
                    await generateEntity({ name, fields })
                    await generateService({ name })
                    await generateResolver({ name })
                    await generateListInputType({ name })
                    await generateWhereUniqueInputType({ name, fields })
                    await generateOrderByInputType({ name, fields })
                    await generateWhereInputType({ name, fields })
                    await generateCreateInputType({ name, fields })
                    await generateUpdateInputType({ name, fields })
                })
            )
        } catch (e) {
            console.error(
                'Error: unable to write files for Prisma NestJS GraphQL Generator',
            )
            throw e
        }
    },
})