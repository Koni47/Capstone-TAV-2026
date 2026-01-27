import { z } from 'zod'
import api from '../lib/axios'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type LoginInput = z.infer<typeof LoginSchema>

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    fullName: z.string(),
    role: z.string(),
    email: z.string().email(),
  }),
})

export type AuthResponse = z.infer<typeof AuthResponseSchema>

export async function login(credentials: LoginInput): Promise<AuthResponse> {
  try {
    const resp = await api.post('/api/v1/auth/login', credentials)
    // normalize backend shapes: prefer `accessToken` (backend) or `token` (frontend mock)
    const data = resp.data || {}
    const normalized = {
      token: data.token ?? data.accessToken ?? data.tokens?.accessToken,
      user: data.user ?? data.user ?? data.user,
    }
    return AuthResponseSchema.parse(normalized)
  } catch (err: any) {
    // useful debug logs for developer
    // eslint-disable-next-line no-console
    console.error('[auth.service] login error', {
      message: err?.message,
      response: err?.response?.data,
      status: err?.response?.status,
      request: !!err?.request,
    })
    throw err
  }
}

export async function fetchProfile(): Promise<AuthResponse['user']> {
  const resp = await api.get('/api/v1/auth/profile')
  return resp.data
}
