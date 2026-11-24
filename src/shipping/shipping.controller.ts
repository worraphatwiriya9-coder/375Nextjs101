
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';

@Controller('shipping')
export class ShippingController {

  @Get()
  calculate(
    @Query('weight') weight: string,
    @Query('zone') zone: string,
  ) {
    const w = Number(weight);

    if (!weight || !Number.isFinite(w) || w <= 0) {
      throw new BadRequestException('weight ต้องเป็นตัวเลขมากกว่า 0');
    }

    const zoneFees = {
      bangkok: 0,
      north: 10,
      south: 25,
    };

    if (!zoneFees.hasOwnProperty(zone)) {
      throw new BadRequestException('zone ไม่ถูกต้อง');
    }

    const extraKg = Math.ceil(Math.max(0, w - 1));
    const baseFee = 50 + extraKg * 18;
    const zoneFee = zoneFees[zone as keyof typeof zoneFees];
    const total = baseFee + zoneFee;

    return {
      weight: w,
      zone,
      baseFee,
      zoneFee,
      total,
    };
  }
}
