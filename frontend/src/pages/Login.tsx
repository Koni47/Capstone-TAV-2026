import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { getHtmlMock } from '../services/mockApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginInput } from '../services/auth.service'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const mock = getHtmlMock('login.html')
  const { login, isLoading: authLoading } = useAuth()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  const { register, handleSubmit, formState } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setErrorMsg(null)
    // debug: show submitted credentials (without password on prod)
    // eslint-disable-next-line no-console
    console.debug('[Login] submitting', { email: data.email })
    try {
      await login(data)
      // login() handles redirect
    } catch (err: any) {
      // debug log full error
      // eslint-disable-next-line no-console
      console.error('[Login] login error:', err)
      if (err?.response) {
        // log axios response details
        // eslint-disable-next-line no-console
        console.debug('[Login] axios response:', err.response)
        // server responded with error
        setErrorMsg(err.response?.data?.message || 'Credenciales incorrectas')
      } else if (err?.request) {
        // log axios request
        // eslint-disable-next-line no-console
        console.debug('[Login] axios request:', err.request)
        // network / CORS
        setErrorMsg('No se pudo conectar con el servidor. Verifique CORS o la red.')
      } else {
        setErrorMsg('Ocurrió un error. Intente nuevamente.')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      {errorMsg && <div className="mb-4 text-sm text-red-700">{errorMsg}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Correo</label>
          <input
            {...register('email')}
            type="email"
            className="w-full border rounded px-3 py-2"
            disabled={authLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            {...register('password')}
            type="password"
            className="w-full border rounded px-3 py-2"
            disabled={authLoading}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={authLoading || formState.isSubmitting}
            className="w-full bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-60"
          >
            {authLoading || formState.isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  )
}

