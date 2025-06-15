// server/api/verify-token.post.ts

// @ts-ignore
import jwt from 'jsonwebtoken'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const token = body.token

    if (!token) {
      return { valid: false }
    }

    const config = useRuntimeConfig()
    jwt.verify(token, config.jwtSecret)

    return { valid: true }
  } catch (error) {
    return { valid: false }
  }
})