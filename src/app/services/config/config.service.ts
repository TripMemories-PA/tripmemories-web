import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    get stripePublicKey() {
        return import.meta.env.NG_APP_STRIPE_PUBLIC_KEY;
    }

    get pusherAppKey() {
        return import.meta.env.NG_APP_PUSHER_APP_KEY;
    }

    get pusherAppCluster() {
        return import.meta.env.NG_APP_PUSHER_APP_CLUSTER;
    }

    get pusherAppSecret() {
        return import.meta.env.NG_APP_PUSHER_APP_SECRET;
    }

    get pusherAppId() {
        return import.meta.env.NG_APP_PUSHER_APP_ID;
    }
}
