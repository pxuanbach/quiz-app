import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  ObjectId,
  now,
  Schema as mongooseSchema,
} from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from '../user/schema';
import { Question } from '../question/schema';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ timestamps: true })
export class Quiz {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  slug: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  imageUrl: string;

  @Prop({ type: Boolean })
  isPrivate: boolean;

  @Prop({ type: Number })
  totalTimeInMinutes: number;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Question.name }],
    default: [],
  })
  @Type(() => Question)
  questions: Question[];

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  createdBy: User;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
