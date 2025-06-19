"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

interface User {
  email: string
  name: string
  type: string
}

// Definir permissões por rota
const routePermissions: Record<string, string[]> = {
  "/": ["admin", "tecnico", "atendente", "usuario"],
  "/orders": ["admin", "tecnico", "atendente", "usuario"],
  "/orders/new": ["admin", "tecnico", "atendente", "usuario"],
  "/clients": ["admin", "tecnico", "atendente"],
  "/clients/new": ["admin", "tecnico", "atendente"],
  "/inventory": ["admin", "tecnico", "atendente"],
  "/reports": ["admin"],
  "/settings": ["admin"],
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const userData = localStorage.getItem("user")

      if (authStatus === "true" && userData) {
        const parsedUser = JSON.parse(userData)
        setIsAuthenticated(true)
        setUser(parsedUser)

        // Verificar permissões para a rota atual
        const allowedRoles = routePermissions[pathname] || []
        const userHasPermission = allowedRoles.includes(parsedUser.type)

        if (!userHasPermission && pathname !== "/login" && pathname !== "/") {
          // Redirecionar para dashboard se não tiver permissão
          router.push("/")
          return
        }
      } else {
        setIsAuthenticated(false)
        if (pathname !== "/login") {
          router.push("/login")
          return
        }
      }
    }

    checkAuth()
  }, [router, pathname])

  // Mostrar loading apenas na primeira verificação
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span>Carregando...</span>
        </div>
      </div>
    )
  }

  // Se não autenticado e não está na página de login, redirecionar
  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  // Se autenticado e está na página de login, redirecionar para dashboard
  if (isAuthenticated && pathname === "/login") {
    router.push("/")
    return null
  }

  // Se está na página de login, mostrar apenas o conteúdo sem sidebar/header
  if (pathname === "/login") {
    return <>{children}</>
  }

  // Se autenticado, mostrar layout completo
  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
