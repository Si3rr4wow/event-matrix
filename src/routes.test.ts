import request from 'supertest'
import './pong'
import { initRoutes } from './routes'
import { app } from './app'
import { beacon } from './beacon'

describe('routes', () => {
  beforeAll(() => {
    initRoutes(app)
  })

  describe('/', () => {
    it('responds with the info page', async () => {
      const response = await request(app).get('/')
      expect(response.status).toBe(200)
      expect(response.text).toMatch(/<!DOCTYPE html>/)
      expect(response.text).toMatch(/Welcome to the Event Matrix/)
    })
  })

  describe('/ping', () => {
    it('responds with pong', async () => {
      const response = await request(app).get('/ping')
      expect(response.status).toBe(200)
      expect(response.text).toMatch(/pong/)
    })

    it("doesn't pollute the beacon's listener pool", async () => {
      const initialListenerCount = beacon.listenerCount('pong')

      await request(app).get('/pong')
      await request(app).get('/pong')
      await request(app).get('/pong')

      expect(beacon.listenerCount('pong')).toEqual(initialListenerCount)
    })
  })

  describe('/ping-wrong', () => {
    beforeEach(() => {
      beacon.removeAllListeners('ping-wrong')
    })
    it('responds with pong', async () => {
      const response = await request(app).get('/ping-wrong')
      expect(response.status).toBe(200)
      expect(response.text).toMatch(/pong/)
    })

    it("pollutes the beacon's listener pool", async () => {
      const initialListenerCount = beacon.listenerCount('pong')

      await request(app).get('/ping-wrong')
      await request(app).get('/ping-wrong')
      await request(app).get('/ping-wrong')

      expect(beacon.listenerCount('pong')).toEqual(initialListenerCount + 3)
    })
  })
})
