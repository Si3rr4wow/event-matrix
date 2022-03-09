import { NextFunction, Response, Request } from 'express'
import { beacon } from '../beacon'
import { waitForPongWrong } from '../pong/pong'
import { wait } from '../utils'
import { pingWrongHandler } from './ping-wrong'

jest.mock('../beacon', () => ({
  beacon: {
    emit: jest.fn(),
    listenerCount: () => 1,
  },
}))

jest.mock('../pong/pong', () => ({
  waitForPongWrong: jest.fn(() => wait(100)),
}))

describe('pingWrongHandler', () => {
  it('emits a ping event', () => {
    pingWrongHandler(
      {} as Request,
      {
        send: () => {},
      } as Response,
      null as unknown as NextFunction
    )
    expect(beacon.emit).toHaveBeenCalledWith('ping')
  })

  it("responds to the request with 'pong' when waitForPongWrong resolves", async () => {
    const res = {
      send: jest.fn(),
    } as unknown as Response

    pingWrongHandler({} as Request, res, null as unknown as NextFunction)
    expect(waitForPongWrong).toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
    await wait(200)
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('pong'))
  })
})
