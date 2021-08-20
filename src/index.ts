import { generateInputType } from './input-type';
import { generateResolver } from './resolver'
import { generateNestMain } from './nest-main'
import { generatePrismaService } from './prisma-service'
import { generateService } from './service'
import { generateEntity } from './entity'
import { generateModule } from './module'
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
            await generateNestMain()
            await generateNestCli()
            await Promise.all(
                models.map(async model => {
                    const { name, fields } = model
                    await generateEntity({ name, fields })
                    await generateService({ name })
                    await generateResolver({ name })
                    await generateModule({ name })
                    await generateInputType({ name })
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