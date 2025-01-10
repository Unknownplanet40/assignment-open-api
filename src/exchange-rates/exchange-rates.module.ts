import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRatesService } from './exchange-rates.service';
import { ExchangeRatesController } from './exchange-rates.controller';

@Module({
  imports: [HttpModule],
  providers: [ExchangeRatesService],
  controllers: [ExchangeRatesController]
})
export class ExchangeRatesModule {}
