import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  openIndexedDB(): any {
    const indexedDB = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB
      || (window as any).msIndexedDB || (window as any).shimIndexedDB;

    const openDB = indexedDB.open('github', 2);

    openDB.onupgradeneeded = () => {
      const db: any = {};
      db.result = openDB.result;

      if (!db.result.objectStoreNames.contains('user')) {
        db.result.store = db.result.createObjectStore('user', { keyPath: 'id' });

      }
    };
    return openDB;
  }

  saveIndexedDB(storeName: string, filedata: any): boolean {
    const context = this;
    const openDB = context.openIndexedDB();

    openDB.onsuccess = () => {
      const db = context.getStoreIndexedDB(openDB, storeName);
      db.store.put(filedata);
    };

    return true;
  }

  getStoreIndexedDB(openDB: { result: any; }, storeName: string): any {
    const db: any = {};
    db.result = openDB.result;

    db.tx = db.result.transaction(storeName, 'readwrite');
    db.store = db.tx.objectStore(storeName);
    return db;
  }

  getIndexedDBById(storeName: string, keyId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const context = this;
      const openDB = context.openIndexedDB();

      openDB.onsuccess = (() => {
        const db = context.getStoreIndexedDB(openDB, storeName);

        const query = db.store.get(keyId);
        query.onsuccess = (event: any) => {
          if (event.target.result) {
            resolve(event.target.result);
          }
          else {
            resolve(null);
          }
        };
        query.onerror = (event: any) => {
          console.log(event.target.errorCode);
        };
        db.tx.oncomplete = () => {
          db.result.close();
        };
      });
    });
  }

  getAllIndexedDB(storeName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const context = this;
      const openDB = context.openIndexedDB();

      openDB.onsuccess = (() => {
        const db = context.getStoreIndexedDB(openDB, storeName);

        const query = db.store.getAll();
        query.onsuccess = (event: any) => {
          if (event.target.result) {
            resolve(event.target.result);
          }
          else {
            resolve(null);
          }
        };
        query.onerror = (event: any) => {
          console.log(event.target.errorCode);
        };
        db.tx.oncomplete = () => {
          db.result.close();
        };
      });
    });
  }

  clearStore(storeName: string) {
    const context = this;
    const openDB = context.openIndexedDB();

    openDB.onsuccess = () => {
      const db = context.getStoreIndexedDB(openDB, storeName);
      db.store.clear();
    };

    return true;

  }
}