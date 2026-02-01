import Elysia, { t } from 'elysia'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { auth } from './auth'
import { AuthLinks } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const autheticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, set, signUser }) => {
    const { code, redirect } = query

    const authLinkFromCode = await db.query.AuthLinks.findFirst({
      where(fields, { eq }) {
        return eq(fields.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Auth link not found!')
    }

    const daySinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daySinceAuthLinkWasCreated > 7) {
      throw new Error('Auth link expired, please generated again!')
    }

    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.managerId, authLinkFromCode.userId)
      },
    })

    await signUser({
      sub: authLinkFromCode.userId,
      restaurantId: managedRestaurant?.id,
    })

    await db.delete(AuthLinks).where(eq(AuthLinks.code, code))

    set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
