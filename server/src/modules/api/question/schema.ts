import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  ObjectId,
  now,
  Schema as mongooseSchema,
} from 'mongoose';
import { Transform, Type } from 'class-transformer';
import QuestionSlugEnum from './enum';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class QuestionAnswer {
  @Prop({ type: Boolean, default: false })
  isCorrect: boolean;

  @Prop({ type: String, required: true })
  text: string;
}

@Schema({ timestamps: true })
export class Question {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: ObjectId;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, required: true, enum: QuestionSlugEnum })
  type: string;

  @Prop({ _id: false, type: [QuestionAnswer], default: [] })
  answers?: QuestionAnswer[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
