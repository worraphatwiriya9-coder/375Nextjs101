import { Module } from '@nestjs/common';
import { FineController } from './fine.controller.js';

@Module({
  controllers: [FineController]
})
export class FineModule {}
