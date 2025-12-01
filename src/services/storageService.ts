export class StorageService {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getData<T>(defaultValue: T): T {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(
        `Error getting data from localStorage: ${this.storageKey}`,
        error
      );
      return defaultValue;
    }
  }

  setData<T>(data: T): boolean {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(
        `Error setting data in localStorage: ${this.storageKey}`,
        error
      );
      return false;
    }
  }

  clearStorage(): boolean {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error(`Error clearing storage: ${this.storageKey}`, error);
      return false;
    }
  }
}
