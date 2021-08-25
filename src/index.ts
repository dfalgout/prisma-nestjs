import * as fs from 'fs'
import * as path from 'path'

import { generateStringFieldUpdateOperationsInputType } from './inputs/string-field-update-operation-input'
import { generateUpdateInputType } from './inputs/update-input'
import { generateCreateInputType } from './inputs/create-input'
import { generateWhereInputType } from './inputs/where-input'
import { generateOrderByInputType } from './inputs/order-by-input'
import { generateWhereUniqueInputType } from './inputs/where-unique-input'
import { generateListInputType } from './inputs/list-input-type'
import { generateSortOrderType } from './inputs/sort-order.input'
import { generateResolver } from './resource/resolver'
import { generateNestMain } from './root/nest-main'
import { generatePrismaService } from './prisma/prisma-service'
import { generateService } from './resource/service'
import { generateEntity } from './resource/entity'
import { generatePrismaModule } from './prisma/prisma-module'
import { generatorHandler } from '@prisma/generator-helper'
import { generateNestCli } from './root/nest-cli'
import { generateAppModuleSchema } from './src/app.module'
import { generateEntityModuleSchema } from './src/entity.module'
import { generateEntityServiceSchema } from './src/entity.service'
import { generateEntityResolverSchema } from './src/entity.resolver'

generatorHandler({
    onManifest() {
        return {
            defaultOutput: '@generated',
            prettyName: 'Prisma NestJS GraphQL Generator',
        }
    },
    async onGenerate(options) {
        const { models } = options.dmmf.datamodel
        const { generator } = options
        const { config } = generator

        const override = config.override || false
        const overwrite = config.overwrite || true
        const output = generator.output?.value || '@generated'

        try {
            if (overwrite) {
                await fs.promises.rmdir(path.resolve(output), {
                    recursive: true,
                })
            }
            await generatePrismaModule({ output })
            await generatePrismaService({ output })
            if (override) {
                const names = models.map(model => model.name)
                await generateNestMain({ output })
                await generateNestCli({ output })
                await generateAppModuleSchema({ names, output })
            }
            await generateStringFieldUpdateOperationsInputType({ output })
            await generateSortOrderType({ output })
            await Promise.all(
                models.map(async model => {
                    const { name, fields } = model
                    await generateEntity({ name, fields, output })
                    await generateService({ name, output })
                    await generateResolver({ name, output })
                    await generateListInputType({ name, output })
                    await generateWhereUniqueInputType({ name, fields, output })
                    await generateOrderByInputType({ name, fields, output })
                    await generateWhereInputType({ name, fields, output })
                    await generateCreateInputType({ name, fields, output })
                    await generateUpdateInputType({ name, fields, output })
                    if (override) {
                        await generateEntityModuleSchema({ name, output })
                        await generateEntityServiceSchema({ name, output })
                        await generateEntityResolverSchema({ name, output })
                    }
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