
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConverterService {

  // คำนวณโดยนำค่าที่รับมาคูณ 5
  convert(value: number): number {
    return value * 5;
  }

}
