import { jwt } from '@elysiajs/jwt'
import Elysia, { t, type Static } from 'elysia'
import { env } from '../../env'

const payloadJWT = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_TOKEN_SECRET,
      schema: payloadJWT,
    }),
  )
  .derive({ as: 'global' }, ({ jwt, cookie, set }) => {
    return {
      signUser: async (payload: Static<typeof payloadJWT>) => {
        const token = await jwt.sign(payload)

        cookie.auth?.set({
          value: token,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })
      },
      signOut: () => {
        cookie.auth?.remove()
      },
      getCurrentUser: async () => {
        const payload = await jwt.verify(
          cookie.auth?.value as string | undefined,
        )

        if (!payload) {
          set.status = 401
          throw new Error('Unauthorized')
        }

        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
    }
  })
