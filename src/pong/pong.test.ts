import { waitForPong, waitForPongWrong } from "."
import { beacon } from "../beacon"

describe('waitForPong', () => {
  it('returns a promise', () => {
    expect(waitForPong()).toBeInstanceOf(Promise)
  })
  describe('the promise is resolved when', () => {
    it('hears a pong event from the beacon', () => {
      const awaitingPong = waitForPong()
      beacon.emit('pong')
      expect(awaitingPong).resolves.toBe('pong')
    })

    it("doesn't pollute the beacon's listener pool", async () => {
      const initialListenerCount = beacon.listenerCount('pong')

      waitForPong()
      waitForPong()
      waitForPong()
      beacon.emit('pong')

      expect(beacon.listenerCount('pong')).toEqual(initialListenerCount)
    })
  })
})

describe('waitForPongWrong', () => {
  it('returns a promise', () => {
    expect(waitForPongWrong()).toBeInstanceOf(Promise)
  })
  describe('the promise is resolved when', () => {
    it('hears a pong event from the beacon', () => {
      const awaitingPong = waitForPongWrong()
      beacon.emit('pong')
      expect(awaitingPong).resolves.toBe('pong')
    })

    it("doesn't pollute the beacon's listener pool", async () => {
      const initialListenerCount = beacon.listenerCount('pong')

      waitForPongWrong()
      waitForPongWrong()
      waitForPongWrong()
      beacon.emit('pong')

      expect(beacon.listenerCount('pong')).toEqual(initialListenerCount  + 3)
    })
  })
})