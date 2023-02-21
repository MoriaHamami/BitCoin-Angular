import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    makeId() {
        var pt1 = Date.now().toString(16)
        var pt2 = this.getRandomInt(1000, 9999).toString(16)
        var pt3 = this.getRandomInt(1000, 9999).toString(16)
        return `${pt3}-${pt1}-${pt2}`.toUpperCase()
    }

    getRandomInt(num1: number, num2: number) {
        var max = num1 >= num2 ? num1 + 1 : num2 + 1
        var min = num1 <= num2 ? num1 : num2
        return Math.floor(Math.random() * (max - min)) + min
    }
    
}
