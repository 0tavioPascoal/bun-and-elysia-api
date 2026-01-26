import {Elysia, t} from 'elysia'
import { env } from '../env'
import { db } from '../db/connection'
import { restaurants, users } from '../db/schema'

const app = new Elysia().post('/restaurants', async ({body, set}) => {
  const {restaurantName, managerName, email,phone} = body

  const [manager] = await db.insert(users).values({
    name: managerName,
    email,
    phone,
    role: 'manager'
  }).returning({
    id: users.id
  })

  await db.insert(restaurants).values({
    name: restaurantName,
    managerId: manager?.id,
  })

  return set.status = 204
}, {
  body: t.Object({
    managerName: t.String(),
    restaurantName: t.String(),
    phone: t.String(),
    email: t.String({format: 'email'})
  })
})

app.listen(env.PORT, () => {
  console.log('🔥 HTTP server running!')
})
