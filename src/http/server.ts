import { Elysia } from 'elysia'
import { env } from '../env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { autheticateFromLink } from './routes/authenticate-from-link'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(autheticateFromLink)

app.listen(env.PORT, () => {
  console.log('🔥 HTTP server running!')
})
