import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalized'
})
export class CapitalizedPipe implements PipeTransform {

  transform(value: any,): any {
    if(!value) return value;

    return value
    .toLowerCase()
    .split(' ')
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  }

}
