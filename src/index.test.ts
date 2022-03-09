import '.'
import { initRoutes } from './routes'
import { app } from './app'

jest.mock('./app', () => ({
  app: {
    listen: jest.fn(),
  },
}))
jest.mock('./routes', () => ({
  initRoutes: jest.fn(),
}))

describe('index.ts', () => {
  it('initialises the app routes', () => {
    expect(initRoutes).toHaveBeenCalledWith(app)
    expect(app.listen).toHaveBeenCalledWith(8080)
  })

  it('has the app listen on port 8080', () => {
    expect(app.listen).toHaveBeenCalledWith(8080)
  })
})
