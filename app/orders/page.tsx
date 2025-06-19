"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  type: string
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const allOrders = [
    {
      id: "OS001",
      client: "João Silva",
      clientEmail: "joao@email.com",
      phone: "(11) 99999-9999",
      device: "Notebook Dell Inspiron",
      problem: "Não liga, possível problema na fonte",
      status: "Em análise",
      priority: "Alta",
      createdAt: "2024-01-15",
      estimatedCompletion: "2024-01-18",
      value: "R$ 150,00",
    },
    {
      id: "OS002",
      client: "Maria Santos",
      clientEmail: "maria@email.com",
      phone: "(11) 88888-8888",
      device: "PC Desktop",
      problem: "Sistema muito lento, possível vírus",
      status: "Aguardando peças",
      priority: "Média",
      createdAt: "2024-01-14",
      estimatedCompletion: "2024-01-20",
      value: "R$ 80,00",
    },
    {
      id: "OS003",
      client: "Pedro Costa",
      clientEmail: "pedro@email.com",
      phone: "(11) 77777-7777",
      device: "Smartphone Samsung",
      problem: "Tela quebrada, touch não funciona",
      status: "Em reparo",
      priority: "Baixa",
      createdAt: "2024-01-13",
      estimatedCompletion: "2024-01-17",
      value: "R$ 200,00",
    },
    {
      id: "OS004",
      client: "Carlos Cliente",
      clientEmail: "usuario@techfix.com.br",
      phone: "(11) 66666-6666",
      device: "Notebook HP",
      problem: "Teclado não funciona",
      status: "Concluído",
      priority: "Média",
      createdAt: "2024-01-10",
      estimatedCompletion: "2024-01-15",
      value: "R$ 120,00",
    },
    {
      id: "OS005",
      client: "Carlos Cliente",
      clientEmail: "usuario@techfix.com.br",
      phone: "(11) 66666-6666",
      device: "Smartphone iPhone",
      problem: "Bateria não carrega",
      status: "Em análise",
      priority: "Alta",
      createdAt: "2024-01-16",
      estimatedCompletion: "2024-01-20",
      value: "R$ 180,00",
    },
  ]

  // Filtrar ordens baseado no tipo de usuário
  const orders = user?.type === "usuario" ? allOrders.filter((order) => order.clientEmail === user.email) : allOrders

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.device.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const isClient = user?.type === "usuario"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{isClient ? "Minhas Ordens de Serviço" : "Ordens de Serviço"}</h1>
          <p className="text-muted-foreground">
            {isClient ? "Acompanhe o status dos seus equipamentos" : "Gerencie todas as ordens de serviço"}
          </p>
        </div>
        <Button asChild>
          <Link href="/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            {isClient ? "Solicitar Serviço" : "Nova Ordem"}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            {isClient ? "Filtre suas ordens de serviço" : "Filtre e busque ordens de serviço"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={isClient ? "Buscar por ID ou dispositivo..." : "Buscar por cliente, ID ou dispositivo..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Em análise">Em análise</SelectItem>
                <SelectItem value="Aguardando peças">Aguardando peças</SelectItem>
                <SelectItem value="Em reparo">Em reparo</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ordens</CardTitle>
          <CardDescription>{filteredOrders.length} ordem(ns) encontrada(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                {!isClient && <TableHead>Cliente</TableHead>}
                <TableHead>Dispositivo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  {!isClient && (
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.client}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.device}</p>
                      <p className="text-sm text-muted-foreground">{order.problem}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.value}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!isClient && (
                        <>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
