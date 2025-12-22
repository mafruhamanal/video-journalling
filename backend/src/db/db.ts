import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);
// exports a Drizzle db instance to use throughout app to run queries
// schema can be defined separately in a schema file 

// 
// const result = await db.insert(users).values({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     age: 30
// });

// console.log(result);

