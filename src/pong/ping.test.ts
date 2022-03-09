import { EventEmitter } from 'events'
import { onPing } from './ping'
import { beacon } from '../beacon'
import { wait } from '../utils'

const emitMock = jest.spyOn(EventEmitter.prototype, 'emit').mockImplementation()

describe('ping', () => {
  it('registers an on ping event', () => {
    expect(beacon.listenerCount('ping')).toBe(1)
  })
})

describe('onPing', () => {
  it('emits a pong after 100ms', async () => {
    onPing()
    expect(emitMock).not.toHaveBeenCalled()
    await wait(100)
    expect(emitMock).toHaveBeenCalledWith('pong')
  })
})
