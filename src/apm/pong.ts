import { beacon } from '../beacon'

beacon.on('pong', () => {
  console.log('ponging')
})
