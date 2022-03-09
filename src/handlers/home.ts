import path from 'path'
import { RequestHandler } from 'express'

export const homeHandler: RequestHandler = (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'info.html'))
}
