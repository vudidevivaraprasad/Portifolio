import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { contentfulSkillsEntrySchema, contentfulExperienceEntrySchema, contentfulProjectEntrySchema, contentfulAboutMeEntrySchema } from './interfaces/contentful';
import { Contentful } from './services/contentful';
import { Skills } from './components/skills/skills';
import { ProjectCards } from './components/project-cards/project-cards';
import { Experience } from './components/experience/experience';
import { About } from './components/about/about';

@Component({
  selector: 'app-root',
  imports: [Navbar,Home,Skills,ProjectCards,Experience,About],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit,AfterViewInit {
  protected readonly title = signal('Portifolio');
  activeSection = signal<string>('Home')

  private readonly contentfulService = inject(Contentful)
  readonly skillsData = signal<contentfulSkillsEntrySchema[]>([] as contentfulSkillsEntrySchema[])
  readonly experienceData = signal<contentfulExperienceEntrySchema[]>([] as contentfulExperienceEntrySchema[])
  readonly projectsData = signal<contentfulProjectEntrySchema[]>([] as contentfulProjectEntrySchema[])
  readonly aboutMeData = signal<contentfulAboutMeEntrySchema[]>([] as contentfulAboutMeEntrySchema[])

  ngOnInit(): void {
    this.contentfulService.getSkillsContent().subscribe(skills => this.skillsData.set(skills))
    this.contentfulService.getExperienceContent().subscribe(skills => this.experienceData.set(skills))
    this.contentfulService.getProjectsContent().subscribe(skills => this.projectsData.set(skills))
    this.contentfulService.getAboutMeContent().subscribe(skills => this.aboutMeData.set(skills))
  }

  navigateTo(section: string): void {
    document
      .getElementById(section)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  }

  ngAfterViewInit(): void {

    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        console.log('something')

        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleSections.length) {
          this.activeSection.set(
            visibleSections[0].target.id
          );
        }

      },
      {
        root: null,

        // Activate a section when it reaches roughly
        // the middle portion of the viewport
        rootMargin: '-30% 0px -60% 0px',

        threshold: 0
      }
    );

    sections.forEach(section => observer.observe(section));
  }
}
