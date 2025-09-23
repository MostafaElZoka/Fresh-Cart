import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: IProduct[], text: string): any[] {
    if (!value) return [];
    if (!text) return value;
    return value.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
  }

}
