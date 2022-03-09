import './ping'
import { beacon } from '../beacon'

describe('ping apm', () => {
  it('registers an on ping event', () => {
    expect(beacon.listenerCount('ping')).toBe(1)
  })

  it('does a console log on ping', () => {
    console.log = jest.fn()
    beacon.emit('ping')
    expect(console.log).toHaveBeenCalled()
  })
})
