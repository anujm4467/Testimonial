import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTestimonialDto {
  @ApiProperty({
    description: 'name of the testimonial person',
    example: 'Vinod',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'what is post of testimonial',
    example: 'CEO',
  })
  @IsNotEmpty()
  @IsString()
  post: string;

  @ApiProperty({
    description: 'write Description',
    example:
      ' you made it so simple. My new site is so much faster and easier to work with than my old site.\
     I just choose the page  make the change and click save.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(20, 500)
  testimonialDescription: string;
}
