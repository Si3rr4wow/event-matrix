import { Express } from 'express'
import { pingHandler } from './handlers/ping'
import { pingWrongHandler } from './handlers/ping-wrong'
import { homeHandler } from './handlers/home'

export const initRoutes = (app: Express): void => {
  app.get('/', homeHandler)

  app.get('/ping', pingHandler)

  app.get('/ping-wrong', pingWrongHandler)
}
