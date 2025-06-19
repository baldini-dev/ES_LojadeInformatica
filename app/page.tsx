"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, DollarSign, Users, Wrench, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  type: string
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const isClient = user?.type === "usuario"

  // Stats para funcionários
  const staffStats = [
    {
      title: "Ordens Abertas",
      value: "23",
      description: "Serviços em andamento",
      icon: Wrench,
      color: "text-blue-600",
    },
    {
      title: "Clientes Ativos",
      value: "156",
      description: "Total de clientes",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Receita Mensal",
      value: "R$ 12.450",
      description: "Faturamento do mês",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Prazo Vencido",
      value: "3",
      description: "Ordens atrasadas",
      icon: AlertCircle,
      color: "text-red-600",
    },
  ]

  // Stats para clientes
  const clientStats = [
    {
      title: "Ordens Ativas",
      value: "1",
      description: "Equipamentos em reparo",
      icon: Wrench,
      color: "text-blue-600",
    },
    {
      title: "Ordens Concluídas",
      value: "1",
      description: "Serviços finalizados",
      icon: AlertCircle,
      color: "text-green-600",
    },
    {
      title: "Tempo Médio",
      value: "3 dias",
      description: "Tempo de reparo",
      icon: Clock,
      color: "text-yellow-600",
    },
  ]

  const allOrders = [
    {
      id: "OS001",
      client: "João Silva",
      clientEmail: "joao@email.com",
      device: "Notebook Dell",
      problem: "Não liga",
      status: "Em análise",
      date: "2024-01-15",
      priority: "Alta",
    },
    {
      id: "OS004",
      client: "Carlos Cliente",
      clientEmail: "usuario@techfix.com.br",
      device: "Notebook HP",
      problem: "Teclado não funciona",
      status: "Concluído",
      date: "2024-01-10",
      priority: "Média",
    },
    {
      id: "OS005",
      client: "Carlos Cliente",
      clientEmail: "usuario@techfix.com.br",
      device: "Smartphone iPhone",
      problem: "Bateria não carrega",
      status: "Em análise",
      date: "2024-01-16",
      priority: "Alta",
    },
  ]

  // Filtrar ordens para clientes
  const recentOrders = isClient ? allOrders.filter((order) => order.clientEmail === user?.email) : allOrders.slice(0, 3)

  const stats = isClient ? clientStats : staffStats

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em análise":
        return "bg-blue-100 text-blue-800"
      case "Aguardando peças":
        return "bg-yellow-100 text-yellow-800"
      case "Em reparo":
        return "bg-orange-100 text-orange-800"
      case "Concluído":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Média":
        return "bg-yellow-100 text-yellow-800"
      case "Baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{isClient ? `Bem-vindo, ${user?.name}` : "Dashboard - TechFix"}</h1>
        <p className="text-muted-foreground">
          {isClient ? "Acompanhe o status dos seus equipamentos" : "Visão geral da sua loja de manutenção"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className={`grid gap-4 ${isClient ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{isClient ? "Suas Ordens de Serviço" : "Ordens de Serviço Recentes"}</CardTitle>
              <CardDescription>
                {isClient ? "Acompanhe o status dos seus equipamentos" : "Últimas ordens cadastradas no sistema"}
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/orders">Ver todas</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    <Badge variant="outline" className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {!isClient && `${order.client} - `}
                    {order.device}
                  </p>
                  <p className="text-sm">{order.problem}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(order.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            {isClient ? "Acesso rápido às principais funcionalidades" : "Acesso rápido às principais funcionalidades"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isClient ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Button asChild className="h-20 flex-col gap-2">
                <Link href="/orders/new">
                  <Wrench className="h-6 w-6" />
                  Solicitar Novo Serviço
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link href="/orders">
                  <AlertCircle className="h-6 w-6" />
                  Ver Minhas Ordens
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <Button asChild className="h-20 flex-col gap-2">
                <Link href="/orders/new">
                  <Wrench className="h-6 w-6" />
                  Nova Ordem de Serviço
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link href="/clients/new">
                  <Users className="h-6 w-6" />
                  Cadastrar Cliente
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link href="/reports">
                  <DollarSign className="h-6 w-6" />
                  Relatórios
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
