export class CreateQuestionDto {
  title: string;
  image_url: string;
  description: string;
  answer: string;
  quizId: string;
  alternatives: string[];
}
