import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64Image',
  standalone: true
})
export class Base64ImagePipe implements PipeTransform {
  transform(value: string, format: string = 'jpeg'): string {
    return `data:image/${format};base64,${value}`;
  }
}
