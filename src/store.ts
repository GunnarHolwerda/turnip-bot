type StoreData = { [key: string]: Array<number> };

export class Store {
    private db: StoreData;

    constructor(initialData: StoreData) {
        this.db = initialData;
    }

    storePriceForUser(userId: string, price: number): void {
        const pricesExistForUser = userId in this.db;
        if (!pricesExistForUser) {
            this.db[userId] = [];
        }
        this.db[userId].push(price);
    }

    latestPriceForUser(userId: string): number {
        if (userId in this.db) {
            return this.db[userId].slice(-1)[0];
        } else {
            return -1;
        }
    }
}
