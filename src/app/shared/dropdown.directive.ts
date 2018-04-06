import { Directive,
  HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(){
    // console.log('Dropdown directive');
  }
  @HostBinding('class.show') isOpen = false;

  @HostListener('mouseover') toggleOpen() {
    // console.log('mouseover');
    // console.log(this.isOpen);
    this.isOpen = !this.isOpen;
  }
}
