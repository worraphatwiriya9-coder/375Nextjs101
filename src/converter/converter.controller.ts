
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { ConverterService } from './converter.service.js';

@Controller('converter')
export class ConverterController {
  constructor(
    private readonly converterService: ConverterService,
  ) {}

  @Get()
  convert(@Query('value') value?: string) {

    // 1. รับค่าจาก URL และแปลงเป็นตัวเลข
    const num = Number(value);

    // 2. ตรวจสอบความถูกต้อง
    if (
      value === undefined ||
      value.trim() === '' ||
      !Number.isFinite(num)
    ) {
      throw new BadRequestException(
        'value ต้องเป็นตัวเลข',
      );
    }

    // 3. ส่งข้อมูลไปให้ Service คำนวณ
    return {
      value: num,
      result: this.converterService.convert(num),
    };
  }
}
