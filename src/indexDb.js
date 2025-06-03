import { openDB } from "idb";

const DB_NAME = "offline-db";
const STORE_NAME = "requests";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function addOfflineRequest(request) {
  const db = await getDB();
  await db.add(STORE_NAME, {
    ...request,
    timestamp: Date.now(),
  });
}

export async function getAllRequests() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function deleteRequest(id) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
