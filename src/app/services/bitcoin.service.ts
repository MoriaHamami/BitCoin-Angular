import { Injectable } from '@angular/core';
import axios from "axios"
import { StorageService } from "./storage.service"
// import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    constructor(private storageService: StorageService) { }
    // constructor(private http: HttpClient) { }

    async getRate() {
        let rate = this.storageService.load('rate')
        if (rate) return rate
        try {
            rate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
            console.log('rate:', rate)
            this.storageService.save('rate', rate.data)
            return rate.data
        }
        catch (err: any) {
            throw new Error('Err', err)
        }
    }

    async getMarketPriceHistory() {
        let pricesHistory = this.storageService.load('prices-history')
        if (pricesHistory) return pricesHistory
        try {
            pricesHistory = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
            this.storageService.save('prices-history', pricesHistory.data)
            return pricesHistory.data
        }
        catch (err: any) {
            throw new Error('Err', err)
        }
    }
    // {
    //     x: timestamp
    //     y: value in USdollar
    // }

    async getAvgBlockSize() {
        let avgBlockSize = this.storageService.load('avg-block-size')
        if (avgBlockSize) return avgBlockSize
        try {
            const blockSizeAvgs = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=1months&format=json&cors=true`)
            // console.log(blockSizeAvgs)
            this.storageService.save('avg-block-size', blockSizeAvgs.data)
            return blockSizeAvgs.data
        }
        catch (err: any) {
            throw new Error('Err', err)
        }
    }
    // {
    //     x: timestamp
    //     y: avarege block size in MB
    // }
}
