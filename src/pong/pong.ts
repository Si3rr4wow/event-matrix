import { beacon } from '../beacon'

export const waitForPong = () =>
  new Promise((resolve) => {
    beacon.once('pong', () => {
      resolve('pong')
    })
  })

export const waitForPongWrong = () =>
  new Promise((resolve) => {
    beacon.on('pong', () => {
      resolve('pong')
    })
  })
