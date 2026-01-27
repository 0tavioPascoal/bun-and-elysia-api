import { Elysia } from 'elysia'
import { env } from '../env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/sen-auth-link'

const app = new Elysia().use(registerRestaurant).use(sendAuthLink)

app.listen(env.PORT, () => {
  console.log('🔥 HTTP server running!')
})
