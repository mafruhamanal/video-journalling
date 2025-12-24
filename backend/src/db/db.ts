import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

const sqlite = new Database('./sqlite.db'); 
export const db = drizzle(sqlite, { schema });
// exports a Drizzle db instance to use throughout app to run queries
// schema can be defined separately in a schema file 

// 
// const result = await db.query.users.findMany({
// 	with: {
// 		videos: true			
// 	},
// });
// const result = await db.insert(users).values({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
// });

// const result = await db.insert(schema.users).values( { // this WORKED
//     firstName: 'Mafruha',
//     lastName: 'Manal',
//     email: 'mafruha.m@example.com',
// })

// console.log(result);

// const result = await db.query.users.findFirst()
// console.log(result)
// need to run migration for tables to exist w these things? 
// to run migrations,  do npx drizzle-kit push in backend

// i also cd'd into backend then ran npx tsx ./src/db/db.ts  

