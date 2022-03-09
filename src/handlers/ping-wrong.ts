import { RequestHandler } from 'express'
import { beacon } from '../beacon'
import { waitForPongWrong } from '../pong/pong'

export const pingWrongHandler: RequestHandler = (_, res) => {
  beacon.emit('ping')
  waitForPongWrong().then((response) => {
    res.send(
      `${response}\n\nThere are now ${beacon.listenerCount(
        'pong'
      )} listeners attached to 'pong'`
    )
  })
}
