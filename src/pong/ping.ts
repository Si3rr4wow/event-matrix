import { beacon } from '../beacon'
import { wait } from '../utils'

export const onPing = async () => {
  await wait(100)
  beacon.emit('pong')
}

beacon.on('ping', onPing)
