import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Activity {
  @Prop()
  city: string;

  @Prop()
  createdBy: string;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop()
  price: number;

  @Prop()
  type: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
