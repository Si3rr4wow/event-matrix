import { wait } from './utils'

describe('wait', () => {
  it('returns a promise', () => {
    expect(wait(100)).toBeInstanceOf(Promise)
  })

  it('resolves after the given amount of time has passed', () => {
    const startTime = new Date()
    wait(100).then(() => {
      const endTime = new Date()
      const deltaTime = endTime.valueOf() - startTime.valueOf()
      expect(deltaTime).toBeGreaterThanOrEqual(100)
    })
  })
})
