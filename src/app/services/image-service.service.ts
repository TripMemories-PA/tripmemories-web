import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ImageServiceService {
    constructor() {}

    getImageDimensions(url?: string): Promise<{ width: number; height: number }> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = (error) => {
                reject(error);
            };
            if (url) img.src = url;
        });
    }
}
