import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AssetResponse, contentfulAboutMeEntryResponse, contentfulExperienceEntryResponse, contentfulProjectsEntryResponse, contentfulSkillsEntryResponse } from '../interfaces/contentful';


@Injectable({
  providedIn: 'root',
})
export class Contentful {

  private readonly URL = 'https://cdn.contentful.com/spaces/97ee7b04slkm/environments/master/entries'
  private readonly AssetURL = 'https://cdn.contentful.com/spaces/97ee7b04slkm/environments/master/assets/'
  private readonly Bearer = 'Bearer THCV3QQ_fFAHWC2pYb0gcUd2L6UJP0wcqkpzAxoxnxo'

  private readonly httpClient = inject(HttpClient)

  getProjectsContent(): Observable<contentfulProjectsEntryResponse['items']>{
    return this.httpClient.get<contentfulProjectsEntryResponse>(
      `${this.URL}?content_type=projects`,
      {
        headers:{
          'Authorization': this.Bearer
        }
      }
    ).pipe(
      map((ProjectsResponse: contentfulProjectsEntryResponse) => ProjectsResponse?.items)
    )
  }
  getExperienceContent(): Observable<contentfulExperienceEntryResponse['items']>{
    return this.httpClient.get<contentfulExperienceEntryResponse>(
      `${this.URL}?content_type=experience`,
      {
        headers:{
          'Authorization': this.Bearer
        }
      }
    ).pipe(
      map((ProjectsResponse: contentfulExperienceEntryResponse) => ProjectsResponse?.items)
    )
  }
  getSkillsContent(): Observable<contentfulSkillsEntryResponse['items']>{
    return this.httpClient.get<contentfulSkillsEntryResponse>(
      `${this.URL}?content_type=skills`,
      {
        headers:{
          'Authorization': this.Bearer
        }
      }
    ).pipe(
      map((ProjectsResponse: contentfulSkillsEntryResponse) => ProjectsResponse?.items)
    )
  }
  getAboutMeContent(): Observable<contentfulAboutMeEntryResponse['items']>{
    return this.httpClient.get<contentfulAboutMeEntryResponse>(
      `${this.URL}?content_type=aboutMe`,
      {
        headers:{
          'Authorization': this.Bearer
        }
      }
    ).pipe(
      map((ProjectsResponse: contentfulAboutMeEntryResponse) => ProjectsResponse?.items)
    )
  }

  getAssetBasedonId(id:string): Observable<string> {
    return this.httpClient.get<AssetResponse>(`${this.AssetURL}${id}`,
      {
        headers:{
          'Authorization': this.Bearer
        }
      }
    )
      .pipe(
        map((asset) => {
          const url = asset?.fields?.file?.url ?? '';
          const cleanUrl = url.replace(/^['"]|['"]$/g, '');

          return cleanUrl.startsWith('//') ? `https:${cleanUrl}` : cleanUrl;
        })
      )
  }

}
