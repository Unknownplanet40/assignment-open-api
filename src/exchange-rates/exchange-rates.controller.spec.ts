import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRatesController } from './exchange-rates.controller';

describe('ExchangeRatesController', () => {
  let controller: ExchangeRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRatesController],
    }).compile();

    controller = module.get<ExchangeRatesController>(ExchangeRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
