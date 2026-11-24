
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';

@Controller('fine')
export class FineController {

  @Get()
  calculate(
    @Query('days') days: string,
    @Query('type') type: string,
  ) {
    const d = Number(days);

    if (
      days === undefined ||
      days.trim() === '' ||
      !Number.isInteger(d) ||
      d < 0
    ) {
      throw new BadRequestException('days ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
    }

    const rates = {
      general: 5,
      reserve: 20,
      reference: 50,
    };

    if (!Object.prototype.hasOwnProperty.call(rates, type)) {
      throw new BadRequestException('type ไม่ถูกต้อง');
    }

    const chargeableDays = Math.max(0, d - 3);
    const rate = rates[type as keyof typeof rates];
    const total = Math.min(chargeableDays * rate, 500);

    return {
      days: d,
      type,
      chargeableDays,
      rate,
      total,
    };
  }
}
