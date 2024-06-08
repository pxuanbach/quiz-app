import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, now } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import RoleSlugEnum from './enum';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, enum: RoleSlugEnum })
  slug: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
