import { Elysia } from 'elysia'
import { env } from '../env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { autheticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { auth } from './routes/auth'
import { getManagedRestaurant } from './routes/get-managed-restaurant'
import { getProfile } from './routes/get-profile'

const app = new Elysia()
  .use(auth)
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(autheticateFromLink)
  .use(getManagedRestaurant)
  .use(getProfile)
  .use(signOut)

app.listen(env.PORT, () => {
  console.log('🔥 HTTP server running!')
})
