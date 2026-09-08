import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { contentfulSkillsEntrySchema } from '../../interfaces/contentful';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  skills = input.required<contentfulSkillsEntrySchema[]>();
  private readonly sanitizer = inject(DomSanitizer);
  selectedSkill = signal<string>('All');

  skillNames = computed(() => {
    return this.skills().map((skill) => skill.fields?.name);
  });

  skilldata = computed(() => {
    return this.skills().map((skill) => skill.fields).map((skill) => {
      return {
        ...skill,
        category:skill.category.split(',').map(item => item.trim())
      }
    });
  });

  filteredSkillData = computed(() => {
    if(this.selectedSkill() ==='All'){
      return this.skilldata()
    }
    return this.skilldata().filter(skill => skill.category.includes(this.selectedSkill()))
  })

  skillCategories = computed(() => {
    let temp: string[] = [];
    this.skilldata().forEach((skilldata) => {
      skilldata.category.forEach((skill) => {
        temp.indexOf(skill) === -1 ? temp.push(skill) : '';
      });
    });
    return temp;
  });

  skillLogo(skill: any): SafeHtml {
    const logo = skill.logoTag?.content?.[0]?.content?.[0]?.value ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(logo);
  }
}
