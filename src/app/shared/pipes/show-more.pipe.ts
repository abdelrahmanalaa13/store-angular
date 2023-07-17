import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'showMore',
})
export class showMorePipe implements PipeTransform {
  transform(value: string, togglePipe: boolean, limit: number): string {
    return value.length > limit && togglePipe
      ? value.substring(0, 50) + '...'
      : value;
  }
}
