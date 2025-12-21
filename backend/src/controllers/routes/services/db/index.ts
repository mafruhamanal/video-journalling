// express server will go here
import express, { Request, Response } from 'express';

const app = express()
const port = 3000

app.get('/', (req: Request , res: Response) => {
  res.send('Hello World!')
})


app.get('/get', (req: Request , res: Response) => {
  res.send('Wow World!')
})

app.listen(port, () => {
  console.log(`vid journal app listening on port ${port}`)
})
