import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { contentfulAboutMeEntrySchema } from '../../interfaces/contentful';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  readonly aboutMe = input.required<contentfulAboutMeEntrySchema[]>();

  readonly aboutMedata = computed(() => {
    return this.aboutMe()?.[0]?.fields;
  })

}
