import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  scrolledToNavItem = input.required<string>();
  selectedNavItem = output<string>();
  NavItems = signal<string[]>(['Home','Skills','Projects','Experience','About'])
  selected = signal<string>(this.NavItems()[0])

  constructor(){
    effect(() => {
      this.selected.set(this.scrolledToNavItem())
    })
  }

  navItemClick(item:string){
    this.selected.set(item)
    this.selectedNavItem.emit(item)
  }

}
