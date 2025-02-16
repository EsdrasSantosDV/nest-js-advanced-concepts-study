import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';

//PODEMOIS FAZER UM MIXXIN DE UM PIPE TAMBEM
export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private entityRepository: { exists(condition: unknown): Promise<void> },
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
      await this.entityRepository.exists({ where: { id: value } }); // throws if entity does not exist
      return value;
    }
  }
  return EntityExistsPipeCls;
}

/*
@Patch(':id')
update(
  @Param('id', EntityExistsPipe(Coffee)) id: string, // 👈 example of using the new Pipe (comment out next line)
  // @Param('id') id: string,
  @Body() updateCoffeeDto: UpdateCoffeeDto,
) {
  return this.coffeesService.update(+id, updateCoffeeDto);
}
 */
