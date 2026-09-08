import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { contentfulProjectEntrySchema } from '../../interfaces/contentful';
import { Contentful } from '../../services/contentful';

@Component({
  selector: 'app-project-cards',
  imports: [AsyncPipe],
  templateUrl: './project-cards.html',
  styleUrl: './project-cards.css',
})
export class ProjectCards {
  projects = input.required<contentfulProjectEntrySchema[]>();
  contentfulService = inject(Contentful);

  projectsData = computed(() => {
    return this.projects().map((project) => project.fields);
  });

  private readonly imageRequests = new Map<string, Observable<string>>();

  getImage(id: string): Observable<string> {
    let imageRequest = this.imageRequests.get(id);

    if (!imageRequest) {
      imageRequest = this.contentfulService.getAssetBasedonId(id);
      this.imageRequests.set(id, imageRequest);
    }

    return imageRequest;
  }
}
