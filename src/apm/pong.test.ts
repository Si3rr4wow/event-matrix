import './pong'
import { beacon } from '../beacon'

describe('pong apm', () => {
  it('registers an on pong event', () => {
    expect(beacon.listenerCount('pong')).toBe(1)
  })

  it('does a console log on pong', () => {
    console.log = jest.fn()
    beacon.emit('pong')
    expect(console.log).toHaveBeenCalled()
  })
})
