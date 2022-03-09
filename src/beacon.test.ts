import { beacon } from './beacon'
import EventEmitter from 'events'

describe('beacon', () => {
  it('is an event emitter', () => {
    expect(beacon).toBeInstanceOf(EventEmitter)
  })
})
