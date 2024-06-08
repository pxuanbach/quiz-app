import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugProvider {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  slugify(slug: string) {
    return slugify(slug, { replacement: '-', lower: true });
  }

  replacement(): string {
    return '-';
  }
}
