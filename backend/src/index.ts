// express server will go here
import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { db } from './db/db.js';
import {users, videos } from './db/schema.js';

type User = typeof users.$inferSelect;
type Video = typeof videos.$inferSelect;

const app = express()
const port = 3000

app.use(cors( {
   origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.get('/', (req: Request , res: Response) => {
  res.send('Hello World!')
})


app.get('/get', async (req: Request , res: Response) => {
  const result: User | undefined = await db.query.users.findFirst()
  if (!result) {
    res.status(404).send("Error");
  }
  res.send(result);
})

app.listen(port, () => {
  console.log(`vid journal app listening on port ${port}`)
})
