import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Testimonial, testimonialSchema } from './schema/testimonial.schema';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Testimonial.name, schema: testimonialSchema },
    ]),
  ],
  controllers: [TestimonialController],
  providers: [TestimonialService],
  exports: [MongooseModule],
})
export class TestimonialModule {}
