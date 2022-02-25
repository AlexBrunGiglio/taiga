import { Subject } from "rxjs";

export class LocalStorageService {
    public static quotaLimitExceeded = new Subject<void>();
    public static saveInLocalStorage(key: string, value: string | undefined): void {
        if (typeof localStorage === 'undefined' || !key)
            return;
        try {
            localStorage.setItem(key, value!);
        } catch (err: any) {
            if (err instanceof Error) {
                return console.log('Error : ', err.message);
            }
            localStorage.removeItem(key);
            if (err.name === 'QUOTA_EXCEEDED_ERR' || err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                this.quotaLimitExceeded.next();
            }
            console.error('Local storage service => quota exceeded !');
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

    public static getFromLocalStorage(key: string) {
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