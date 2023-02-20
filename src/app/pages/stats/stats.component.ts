import { Component } from '@angular/core';
import { Value, Data, GraphData } from 'src/app/models/graph-data.model';
import { BitcoinService } from 'src/app/services/bitcoin.service'

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  constructor(private bitcoinService: BitcoinService) { }

  marketPriceHistory: Data | null = null
  avgBlockSize: Data | null = null

  chartData: GraphData = {
    // labels: {
    marketPriceHistory: {
      labels: [],
      datasets: [
        {
          label: "Average USD market price",
          data: [],
          fill: true,
          tension: 0.5,
          backgroundColor: "#f7931a60",
          borderColor: '#f7931a90',
        },
      ],
    },
    avgBlockSize: {
      labels: [],
      datasets: [
        {
          label: "Average block size (MB)",
          data: [],
          fill: true,
          tension: 0.5,
          backgroundColor: "#f7931a60",
          borderColor: '#f7931a90',
        },
      ],
    },
  }

  ngOnInit() {
    this.getMarketPriceHistory();
    this.getAvgBlockSize();

    window.addEventListener('resize', () => {
      this.marketPriceHistory = null
      setTimeout(() => {
        this.getMarketPriceHistory()
        this.getAvgBlockSize()
      }, 50)
    })
  }

  async getMarketPriceHistory() {
    this.marketPriceHistory = await this.bitcoinService.getMarketPriceHistory();
    if (this.marketPriceHistory) this.chartData.marketPriceHistory.labels =
      this.marketPriceHistory.values.map((value: Value) => {
        const date = new Date(value.x * 1000);
        return `${date.getDate() + 1}.${date.getMonth() + 1}`;
      });
    if (this.marketPriceHistory) this.chartData.marketPriceHistory.datasets[0].data =
      this.marketPriceHistory.values.map((value: Value) => value.y);
  }

  async getAvgBlockSize() {
    this.avgBlockSize = await this.bitcoinService.getAvgBlockSize();
    if (this.avgBlockSize) this.chartData.avgBlockSize.labels = this.avgBlockSize.values.map(
      (value: Value) => {
        const date = new Date(value.x * 1000);
        return `${date.getDate() + 1}.${date.getMonth() + 1}`;
      }
    );
    if (this.avgBlockSize) this.chartData.avgBlockSize.datasets[0].data = this.avgBlockSize.values.map(
      (value: Value) => value.y
    );
  }
}
