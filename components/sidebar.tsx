"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Home, Users, Wrench, Package, BarChart3, Settings } from "lucide-react"

interface UserData {
  name: string
  email: string
  type: string
}

const allNavigation = [
  { name: "Dashboard", href: "/", icon: Home, roles: ["admin", "tecnico", "atendente", "usuario"] },
  { name: "Ordens de Serviço", href: "/orders", icon: Wrench, roles: ["admin", "tecnico", "atendente", "usuario"] },
  { name: "Clientes", href: "/clients", icon: Users, roles: ["admin", "tecnico", "atendente"] },
  { name: "Estoque", href: "/inventory", icon: Package, roles: ["admin", "tecnico", "atendente"] },
  { name: "Relatórios", href: "/reports", icon: BarChart3, roles: ["admin"] },
  { name: "Configurações", href: "/settings", icon: Settings, roles: ["admin"] },
]

export function Sidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<UserData | null>(null)
  const [navigation, setNavigation] = useState(allNavigation)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Filtrar navegação baseada no tipo de usuário
      const filteredNavigation = allNavigation.filter((item) => item.roles.includes(parsedUser.type))
      setNavigation(filteredNavigation)
    }
  }, [])

  return (
    <div className="bg-white w-64 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="TechFix" className="h-8" />
        </div>
        {user && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">
              {user.type === "admin" && "Administrador"}
              {user.type === "tecnico" && "Técnico"}
              {user.type === "atendente" && "Atendente"}
              {user.type === "usuario" && "Cliente"}
            </p>
          </div>
        )}
      </div>
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors",
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
