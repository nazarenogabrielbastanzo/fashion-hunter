import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToArray'
})
export class DateToArrayPipe implements PipeTransform {

  transform(value: Date): number[] {

    if (!value) return [];

    const theDate = new Date(value);

    return [theDate.getFullYear(), theDate.getMonth(), theDate.getDate(), theDate.getHours(), theDate.getMinutes(), theDate.getSeconds()];

  }

}
