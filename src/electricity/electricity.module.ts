import { Module } from '@nestjs/common';
import { ElectricityController } from './electricity.controller.js';

@Module({
  controllers: [ElectricityController]
})
export class ElectricityModule {}
