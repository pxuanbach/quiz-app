export class CreateQuizDto {
  title: string;
  img_bg_url: string;
  themeId: string;
  userId: string;
  description: string;
  status: StatusQuiz;
}

export enum StatusQuiz {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
