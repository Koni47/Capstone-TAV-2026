import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/auth.service'
import api from '../lib/axios'

type User = {
  id: string
  fullName: string
  role: string
  email: string
}

type AuthContextValue = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      try {
        const stored = localStorage.getItem('token')
        if (stored) {
          setToken(stored)
          // try to validate / fetch profile; if endpoint not available, this will fail and we clear
          try {
            const profile = await authService.fetchProfile()
            setUser(profile)
          } catch (err) {
            // silently clear invalid token
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
          }
        }
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const resp = await authService.login(credentials)
      localStorage.setItem('token', resp.token)
      setToken(resp.token)
      setUser(resp.user)
      // ensure axios will include token (interceptor reads localStorage), but set default header too
      api.defaults.headers.common.Authorization = `Bearer ${resp.token}`
      // redirect based on role
      if (resp.user.role === 'ADMIN') navigate('/dashboard')
      else if (resp.user.role === 'DRIVER') navigate('/dashboard')
      else navigate('/')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete api.defaults.headers.common.Authorization
    navigate('/login')
  }

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!user || !!token,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
