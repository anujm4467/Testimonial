import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TestimonialDto } from './dto/testimonial.dto';
import { TestimonialService } from './testimonial.service';
import { SwaggerConstant } from '../constant/swagger.constant';
import { Testimonial } from './schema/testimonial.schema';
import { UpdateTestimonialDto } from './dto/updatetestmonial.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('testimonial')
export class TestimonialController {
  private readonly logger = new Logger('TestimonialController');
  constructor(private testimonialService: TestimonialService) {}

  @ApiBody({ type: TestimonialDto, required: true })
  @Header(SwaggerConstant.ContentType, SwaggerConstant.ApplicationJson)
  @ApiResponse({ status: 201, description: ' Testimonial add  Successfully ' })
  @ApiResponse({ status: 400, description: SwaggerConstant.BadRequest })
  @ApiResponse({ status: 401, description: SwaggerConstant.Unauthorized })
  @ApiResponse({ status: 403, description: SwaggerConstant.Forbidden })
  @ApiResponse({ status: 415, description: SwaggerConstant.InvalidContentType })
  @ApiResponse({ status: 500, description: SwaggerConstant.SomethingWentWrong })
  @Post()
  async addTestimonial(
    @Body() testimonialDto: TestimonialDto,
  ): Promise<Testimonial> {
    return this.testimonialService.addTestimonial(testimonialDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Header('Content-Type', 'multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'upload photo ',
  })
  @ApiResponse({ status: 400, description: SwaggerConstant.BadRequest })
  @ApiResponse({ status: 401, description: SwaggerConstant.Unauthorized })
  @ApiResponse({ status: 403, description: SwaggerConstant.Forbidden })
  @ApiResponse({ status: 415, description: SwaggerConstant.InvalidContentType })
  @ApiResponse({ status: 500, description: SwaggerConstant.SomethingWentWrong })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, callback) => {
        if (!file) {
          callback(new NotFoundException('File Not found'), false);
        }
        if (file.mimetype.includes('png')) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Please upload only png file'),
            false,
          );
        }
      },
    }),
  )
  @Put('upload/:id')
  async UploadContact(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<Testimonial> {
    return this.testimonialService.uploadImage(id, file);
  }

  @ApiParam({ name: 'id' })
  @Header(SwaggerConstant.ContentType, SwaggerConstant.ApplicationJson)
  @ApiResponse({ status: 201, description: '  find testimonial Successfully ' })
  @ApiResponse({ status: 400, description: SwaggerConstant.BadRequest })
  @ApiResponse({ status: 401, description: SwaggerConstant.Unauthorized })
  @ApiResponse({ status: 403, description: SwaggerConstant.Forbidden })
  @ApiResponse({ status: 415, description: SwaggerConstant.InvalidContentType })
  @ApiResponse({ status: 500, description: SwaggerConstant.SomethingWentWrong })
  @Get('/:id')
  async findByTestimonialID(@Param('id') id: string) {
    this.logger.verbose('GET called on Testimonial ');
    return this.testimonialService.findTestimonial(id);
  }

  @ApiParam({ name: 'id' })
  @Header(SwaggerConstant.ContentType, SwaggerConstant.ApplicationJson)
  @ApiResponse({ status: 201, description: ' contact Update Successfully ' })
  @ApiResponse({ status: 400, description: SwaggerConstant.BadRequest })
  @ApiResponse({ status: 401, description: SwaggerConstant.Unauthorized })
  @ApiResponse({ status: 403, description: SwaggerConstant.Forbidden })
  @ApiResponse({ status: 415, description: SwaggerConstant.InvalidContentType })
  @ApiResponse({ status: 500, description: SwaggerConstant.SomethingWentWrong })
  @Put('/:id')
  async editTestimonial(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<Testimonial> {
    this.logger.verbose(`Update called on company ${id}`);
    return this.testimonialService.editTestimonial(updateTestimonialDto, id);
  }

  @ApiParam({ name: 'id' })
  @Header(SwaggerConstant.ContentType, SwaggerConstant.ApplicationJson)
  @ApiResponse({ status: 201, description: ' contact Deleted Successfully ' })
  @ApiResponse({ status: 400, description: SwaggerConstant.BadRequest })
  @ApiResponse({ status: 401, description: SwaggerConstant.Unauthorized })
  @ApiResponse({ status: 403, description: SwaggerConstant.Forbidden })
  @ApiResponse({ status: 415, description: SwaggerConstant.InvalidContentType })
  @ApiResponse({ status: 500, description: SwaggerConstant.SomethingWentWrong })
  @Delete('/:id')
  async deleteTestimonial(@Param('id') id: string) {
    this.logger.verbose('Deleting testimonial');
    return await this.testimonialService.deleteTestimonial(id);
  }
}
