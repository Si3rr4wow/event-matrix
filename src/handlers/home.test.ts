import { NextFunction, Request, Response } from 'express'
import { homeHandler } from './home'

describe('homeHandler', () => {
  it('calls sendFile on the given response object with a path to info.html', () => {
    const res = {
      sendFile: jest.fn(),
    } as unknown as Response
    homeHandler({} as Request, res, null as unknown as NextFunction)
    expect(res.sendFile).toHaveBeenCalledWith(
      expect.stringContaining('info.html')
    )
  })
})
