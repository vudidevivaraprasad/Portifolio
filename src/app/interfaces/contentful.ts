export interface contentfulProjectsEntryResponse {
  total: number,
  items: contentfulProjectEntrySchema[]
}

export interface contentfulExperienceEntryResponse {
  total: number,
  items: contentfulExperienceEntrySchema[]
}

export interface contentfulSkillsEntryResponse {
  total: number,
  items: contentfulSkillsEntrySchema[]
}

export interface contentfulAboutMeEntryResponse {
  total: number,
  items: contentfulAboutMeEntrySchema[]
}

export interface contentfulProjectEntrySchema {
  fields: {
      name: string,
      url: string,
      skillsUsed: string[],
      homePageImage: {
          sys: {
              id: string
          }
      },
      shortDescription: string,
      longDescription: string,
      sourceCode: string
  }
}
export interface contentfulExperienceEntrySchema {
  fields: {
      title: string,
      companyname: string,
      date: string,
      responsibilities: string[]
  }
}
export interface contentfulSkillsEntrySchema {
  fields: {
      name: string,
      category: string,
      logoTag: ContentfulRichText
  }
}
export interface contentfulAboutMeEntrySchema {
  fields: {
      name: string,
      role: string,
      description: string,
      mail: string,
      linkedIn: string,
      gitHub: string
  }
}
interface ContentfulRichText {
  content: ContentfulRichTextNode[];
}
interface ContentfulRichTextNode {
  content?: ContentfulRichTextNode[];
  value?: string;
}

export interface AssetResponse {
  fields: {
    file:{
      url:string
    }
  }
}
