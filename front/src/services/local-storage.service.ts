import { Subject } from "rxjs";

export class LocalStorageService {
    public static quotaLimitExceeded = new Subject<void>();
    public static saveInLocalStorage(key: string, value: string): void {
        if (typeof localStorage === 'undefined' || !key)
            return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            localStorage.removeItem(key);
            console.error('Local storage service => quota exceeded !');
            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                this.quotaLimitExceeded.next();
            }
        }
    }

    public static getObjectFromLocalStorage(key: string): any {
        if (typeof localStorage === 'undefined' || !key)
            return;
        const value = this.getFromLocalStorage(key);
        if (!value)
            return null;
        let obj = null;
        try {
            obj = JSON.parse(value);
        }
        catch (err) {
            console.error('getObjectFromLocalStorage', err);
        }
        return obj;
    }

    public static getFromLocalStorage(key: string): string {
        if (typeof localStorage === 'undefined' || !key)
            return null;
        return localStorage.getItem(key);
    }

    public static removeFromLocalStorage(key: string): void {
        if (typeof localStorage === 'undefined' || !key)
            return;
        localStorage.removeItem(key);
    }

    public static getAllKeys(keyStartsWith?: string): string[] {
        const keys: string[] = [];
        if (typeof localStorage !== 'undefined') {
            for (let i = 0; i <= localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (!keyStartsWith || key.startsWith(keyStartsWith)))
                    keys.push(key);
            }
        }
        return keys;
    }
}