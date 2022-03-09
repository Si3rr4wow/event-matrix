import './startup'
import { initRoutes } from './routes'
import { app } from './app'

initRoutes(app)
app.listen(8080)
