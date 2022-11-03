import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { TestimonialDto } from './dto/testimonial.dto';
import { UpdateTestimonialDto } from './dto/updatetestmonial.dto';
import { ITestimonial } from './interface/testimonial.interface';
import { Testimonial, TestimonialDocument } from './schema/testimonial.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TestimonialService {
  private logger = new Logger('TestimonialService');
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonial: Model<TestimonialDocument>,
  ) {}

  async addTestimonial(
    addTestimonialDto: TestimonialDto,
  ): Promise<ITestimonial> {
    this.logger.verbose('Create on Testimonial called');
    return this.testimonial.create(addTestimonialDto);
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<any> {
    const folder = path.join('upload');
    const isExist = fs.existsSync(folder);
    if (!isExist) {
      fs.mkdirSync(folder);
    }

    const filePath = `${folder}/${file.originalname.trim()}`;

    fs.writeFileSync(filePath, file.toString());

    return this.testimonial.findByIdAndUpdate(id, { image: filePath });
  }

  async findTestimonial(id: string): Promise<ITestimonial> {
    this.logger.verbose(`Finding Testimonial with id: ${id}`);
    const testimonial = await this.testimonial.findById({ _id: id });
    if (!testimonial) {
      throw new NotFoundException('id not found');
    }
    return testimonial;
  }

  async editTestimonial(
    updateTestimonialDto: UpdateTestimonialDto,
    id: string,
  ): Promise<Testimonial> {
    this.logger.verbose(`Update on Testimonial called for${id}`);
    const testimonial = await this.testimonial.findByIdAndUpdate(
      id,
      updateTestimonialDto,
    );
    if (!id) {
      throw new NotFoundException('testimonial is not found');
    }
    return testimonial;
  }

  async deleteTestimonial(id: string) {
    this.logger.verbose(`delete testimonial id is ${id}`);

    const deleteTestimonial = await this.testimonial.findByIdAndDelete({
      _id: id,
    });

    if (!deleteTestimonial) {
      throw new NotFoundException('Testimonial not found ');
    }
    return {
      message: 'Testimonial deleted ',
    };
  }
}
