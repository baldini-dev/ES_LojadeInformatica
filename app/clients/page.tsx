"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const clients = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123",
      totalOrders: 5,
      lastOrder: "2024-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      address: "Av. Principal, 456",
      totalOrders: 3,
      lastOrder: "2024-01-14",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 77777-7777",
      address: "Rua do Comércio, 789",
      totalOrders: 8,
      lastOrder: "2024-01-13",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana@email.com",
      phone: "(11) 66666-6666",
      address: "Rua Nova, 321",
      totalOrders: 2,
      lastOrder: "2024-01-10",
    },
  ]

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes</p>
        </div>
        <Button asChild>
          <Link href="/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Clientes</CardTitle>
          <CardDescription>Encontre clientes por nome, email ou telefone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>{filteredClients.length} cliente(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Total de Ordens</TableHead>
                <TableHead>Última Ordem</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{client.address}</TableCell>
                  <TableCell className="text-center">{client.totalOrders}</TableCell>
                  <TableCell>{new Date(client.lastOrder).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
