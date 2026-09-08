import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Contentful } from '../../services/contentful';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  scrolledToNavItem = input.required<string>();
  selectedNavItem = output<string>();
  contentfulService = inject(Contentful);
  NavItems = signal<string[]>(['Home','Skills','Projects','Experience','About'])
  selected = signal<string>(this.NavItems()[0])

  constructor(){
    effect(() => {
      this.selected.set(this.scrolledToNavItem())
    })
  }

  private readonly pdfRequests = new Map<string, Observable<string>>();

  getpdf(id: string): Observable<string> {
    let pdfRequest = this.pdfRequests.get(id);

    if (!pdfRequest) {
      pdfRequest = this.contentfulService.getAssetBasedonId(id);
      this.pdfRequests.set(id, pdfRequest);
    }

    return pdfRequest;
  }

  navItemClick(item:string){
    this.selected.set(item)
    this.selectedNavItem.emit(item)
  }

}
