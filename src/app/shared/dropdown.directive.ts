import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isopen = false;
  constructor() {}

  @HostListener('click') toggleOpen() {
    this.isopen = !this.isopen;
  }
}
