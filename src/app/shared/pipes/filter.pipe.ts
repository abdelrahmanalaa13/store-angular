import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], filterString: string, propName: string): any[] {
    if (!array || filterString === '' || propName === '') {
      return array;
    }
    let result = array.filter((item) =>
      item[propName]
        ?.trim()
        ?.toLowerCase()
        ?.includes(filterString.toLowerCase())
    );
    return result;
  }
}
