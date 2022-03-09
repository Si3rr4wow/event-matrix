import { beacon } from '../beacon'

beacon.on('ping', async () => {
  console.log('pinged')
})
