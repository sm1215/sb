import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('nav') nav: ElementRef;

  // Toggle an alternate, smaller css layout for the nav
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const verticalOffset = window.pageYOffset 
      || document.documentElement.scrollTop 
      || document.body.scrollTop || 0;
      
    if (this.nav) {
      let  action: string;
      verticalOffset > 0 ? action = 'add' : action = 'remove';
      this.nav.nativeElement.classList[action]('on');
    }
  }

  constructor() {}
}
