
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';

@Controller('electricity')
export class ElectricityController {

  @Get()
  calculate(
    @Query('units') units: string,
    @Query('type') type: string,
  ) {
    const u = Number(units);

    if (
      units === undefined ||
      units.trim() === '' ||
      !Number.isInteger(u) ||
      u < 0
    ) {
      throw new BadRequestException('units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
    }

    const serviceCharges = {
      residential: 40,
      business: 90,
    };

    if (!Object.prototype.hasOwnProperty.call(serviceCharges, type)) {
      throw new BadRequestException('type ไม่ถูกต้อง');
    }

    const energyCharge =
      Math.min(u, 150) * 3 +
      Math.max(0, u - 150) * 4;

    const serviceCharge = serviceCharges[type as keyof typeof serviceCharges];
    const total = energyCharge + serviceCharge;

    return {
      units: u,
      type,
      energyCharge,
      serviceCharge,
      total,
    };
  }
}
