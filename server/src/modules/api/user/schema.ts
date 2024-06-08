import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  Schema as mongooseSchema,
  ObjectId,
  now,
} from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { RoleSchema, Role } from '../role/schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class UserSetting {
  @Prop({ type: Number, default: 0 })
  noOfPracticeWord: number;

  // practice from the all words in collection
  @Prop({ type: Boolean, default: true })
  practiceFromAll: boolean;

  // practice from the last 100 words in collection
  @Prop({ type: Number, default: 100 })
  practiceFromLast: number;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);

@Schema()
export class UserSecurity {
  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: String })
  verifyToken: string;

  @Prop({ type: String })
  accessToken: string;

  @Prop({ type: String })
  refreshToken: string;

  @Prop({ type: String })
  resetPassToken: string;
}

export const UserSecuritySchema = SchemaFactory.createForClass(UserSecurity);

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: ObjectId;

  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  @Exclude()
  hashedPassword: string;

  @Prop({ type: Boolean, default: false })
  isSuperUser: boolean;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: Role.name })
  @Type(() => Role)
  role: Role;

  // @Prop({ _id: false, type: UserSettingSchema })
  // @Type(() => UserSetting)
  // setting?: UserSetting;

  @Prop({ _id: false, type: UserSecuritySchema })
  @Type(() => UserSecurity)
  @Exclude()
  security?: UserSecurity;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
