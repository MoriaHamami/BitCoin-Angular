// export const storageService = {
//     load: loadFromStorage,
//     save: saveToStorage,
// }
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    save(key: string, value: object) {
        if (!value) return
        localStorage.setItem(key, JSON.stringify(value))
    }
    load(key: string) {
        let data = localStorage.getItem(key)
        return data ? JSON.parse(data) : undefined
    }
}