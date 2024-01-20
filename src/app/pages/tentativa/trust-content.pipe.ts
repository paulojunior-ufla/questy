import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustContent'
})
export class TrustContentPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }
  
  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
