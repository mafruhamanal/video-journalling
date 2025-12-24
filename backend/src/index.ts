// express server will go here
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import type { Request, Response } from 'express';
import { db } from './db/db.js';
import {users, videos } from './db/schema.js';

type User = typeof users.$inferSelect;
type Video = typeof videos.$inferSelect;
const upload = multer({ dest: 'uploads/' }) // later files stored here used for hls stuff

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
    return res.status(404).send("Error");
  }
  res.send(result);
})

app.get('/vid', async (req: Request, res: Response) => {
  const result: Video | undefined = await db.query.videos.findFirst()
  if (!result) {
    return res.status(404).send("Error");
  }
  res.send(result);
})

app.post('/videos/upload', upload.single('video'), async function (req: Request, res: Response) {
  // later frontend will need to name the input 'video' for the file

  // req.file is the `video` file
  // req.body will hold the text fields, if there were any
  try {
    if (req.file && req.body.userId && req.body.title) {
      const result  = await db.insert(videos).values({
        authorId: req.body.userId,
        title: req.body.title,
        filePath: req.file.path ?? null,
        description: req.body.description ?? "",
        hlsPath: null,
        status: "processing",
      })
      console.log(result)
      res.send(result) // could redirect later to the vid page
    }
    
    else {
      res.status(400).send("Upload had error")
    }
  } catch(error) {
    console.log(error);
    res.status(500).send("Failed to save video")
  }
})

app.listen(port, () => {
  console.log(`vid journal app listening on port ${port}`)
})
