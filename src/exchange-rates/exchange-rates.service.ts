import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRatesService {
    private baseURL = 'http://api.exchangeratesapi.io/v1';

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async getLatestRate(base: string, symbols: string): Promise<any> {
        const url = `${this.baseURL}/latest`;
        const params = {
            access_key: this.configService.get<string>('EXCHANGERATES_API_KEY'),
            base,
            symbols,
        };

        const response = this.httpService.get(url, { params });
        const result = await lastValueFrom(response).then(res => res.data);
        return `
            <html>
            <head>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Exchange Rates</h1>
                <p>Latest Currencies</p>
                <p>Base Currency: ${result.base}</p>
                <p>Date: ${new Date(result.date).toLocaleDateString()}</p>
                <p>Rates for: ${symbols || 'All Currencies'}</p>
                <ul>
                    ${Object.keys(result.rates).slice(0, 5).map(currency => `<li>${currency}: ${result.rates[currency]}</li>`).join('')}
                </ul>
                </div>
            </body>
            </html>
        `;
    }

    async getHistoricalRate(date: string, base: string, symbols: string): Promise<any> {
        const url = `${this.baseURL}/${date}`;
        const params = {
            access_key: this.configService.get<string>('EXCHANGERATES_API_KEY'),
            base,
            symbols,
        };

        const response = this.httpService.get(url, { params });
        const result = await lastValueFrom(response).then(res => res.data);
        return `
            <html>
            <head>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Exchange Rates</h1>
                <p>Currencies History</p>
                <p>Base Currency: ${result.base}</p>
                <p>Date: ${new Date(result.date).toLocaleDateString()}</p>
                <p>Rates for: ${symbols || 'All Currencies'}</p>
                <ul>
                    ${Object.keys(result.rates).slice(0, 5).map(currency => `<li>${currency}: ${result.rates[currency]}</li>`).join('')}
                </ul>
                </div>
            </body>
            </html>
        `;
    }
}
