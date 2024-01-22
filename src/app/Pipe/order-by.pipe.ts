import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string, order: string): any[] {
    const direction = order === 'asc' ? 1 : -1;
    array.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];
      return aValue.localeCompare(bValue) * direction;
    });
    return array;
  }

}
