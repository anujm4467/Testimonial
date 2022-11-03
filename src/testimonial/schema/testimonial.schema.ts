import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdatedAt' } })
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop({})
  image: string;

  @Prop({ required: true })
  post: string;

  @Prop({ required: true })
  testimonialDescription: string;

  @Prop({ required: true, default: true })
  active: boolean;
}

export type TestimonialDocument = Testimonial & Document;
export const testimonialSchema = SchemaFactory.createForClass(Testimonial);
