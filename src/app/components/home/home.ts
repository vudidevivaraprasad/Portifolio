import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { contentfulAboutMeEntrySchema } from '../../interfaces/contentful';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  readonly aboutMe = input.required<contentfulAboutMeEntrySchema[]>();

  selectedNavItem = output<string>();

  readonly aboutMedata = computed(() => {
    return this.aboutMe()?.[0]?.fields;
  })

  navItemClick(item:string){
    this.selectedNavItem.emit(item)
  }

}
