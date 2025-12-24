// express server will go here
import express from 'express';
import type { Request, Response } from 'express';

var cors = require('cors')
const app = express()
const port = 3000

app.use(cors( {
   origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.get('/', (req: Request , res: Response) => {
  res.send('Hello World!')
})


app.get('/get', (req: Request , res: Response) => {
  res.send('Wow World!')
})

app.listen(port, () => {
  console.log(`vid journal app listening on port ${port}`)
})
