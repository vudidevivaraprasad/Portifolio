import { Component, computed, input } from '@angular/core';
import { contentfulAboutMeEntrySchema } from '../../interfaces/contentful';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly aboutMe = input.required<contentfulAboutMeEntrySchema[]>();

  readonly aboutMedata = computed(() => {
    return this.aboutMe()?.[0]?.fields;
  })

}
