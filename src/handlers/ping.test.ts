import { NextFunction, Response, Request } from 'express'
import { beacon } from '../beacon'
import { waitForPong } from '../pong/pong'
import { wait } from '../utils'
import { pingHandler } from './ping'

jest.mock('../beacon', () => ({
  beacon: {
    emit: jest.fn(),
    listenerCount: () => 1,
  },
}))

jest.mock('../pong/pong', () => ({
  waitForPong: jest.fn(() => wait(100)),
}))

describe('pingHandler', () => {
  it('emits a ping event', () => {
    pingHandler(
      {} as Request,
      {
        send: () => {},
      } as Response,
      null as unknown as NextFunction
    )
    expect(beacon.emit).toHaveBeenCalledWith('ping')
  })

  it("responds to the request with 'pong' when waitForPong resolves", async () => {
    const res = {
      send: jest.fn(),
    } as unknown as Response

    pingHandler({} as Request, res, null as unknown as NextFunction)
    expect(waitForPong).toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
    await wait(200)
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('pong'))
  })
})
