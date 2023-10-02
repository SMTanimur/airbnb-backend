import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema({ _id: false })
export class ImageInfo {
  @IsString()
  @Prop({ type: String, required: true })
  img_url: string;

  @IsString()
  @Prop({ type: String, required: true })
  img_id: string;
}

export const ImageInfoSchema = SchemaFactory.createForClass(ImageInfo);
