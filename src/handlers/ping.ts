import { RequestHandler } from 'express'
import { beacon } from '../beacon'
import { waitForPong } from '../pong/pong'

export const pingHandler: RequestHandler = (_, res) => {
  beacon.emit('ping')
  waitForPong().then((response) => {
    res.send(
      `${response}\n\nThere are now ${beacon.listenerCount(
        'pong'
      )} listeners attached to 'pong'`
    )
  })
}
