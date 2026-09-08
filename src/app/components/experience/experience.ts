import { Component, computed, input } from '@angular/core';
import { contentfulExperienceEntrySchema } from '../../interfaces/contentful';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {

  experience = input.required<contentfulExperienceEntrySchema[]>();

  experienceData = computed(() => {
    return this.experience().map(item => item.fields)
  })
}
