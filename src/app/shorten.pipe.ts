import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    if (value.charAt(10)) {
      return value.substr(0, 10) + ' ...';
    }
    return value;
  }
}