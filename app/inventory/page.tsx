"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2, AlertTriangle, Package, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  const inventory = [
    {
      id: 1,
      name: 'Tela LCD 15.6" Full HD',
      category: "Telas",
      brand: "BOE",
      model: "NT156WHM-N12",
      quantity: 5,
      minStock: 3,
      maxStock: 20,
      unitPrice: 280.0,
      totalValue: 1400.0,
      supplier: "TechParts Ltda",
      location: "Prateleira A-1",
      lastUpdate: "2024-01-15",
    },
    {
      id: 2,
      name: "Memória RAM DDR4 8GB",
      category: "Memórias",
      brand: "Kingston",
      model: "KVR26N19S8/8",
      quantity: 12,
      minStock: 5,
      maxStock: 30,
      unitPrice: 180.0,
      totalValue: 2160.0,
      supplier: "Memory Store",
      location: "Gaveta B-2",
      lastUpdate: "2024-01-14",
    },
    {
      id: 3,
      name: "HD SSD 240GB",
      category: "Armazenamento",
      brand: "SanDisk",
      model: "SDSSDA-240G",
      quantity: 2,
      minStock: 4,
      maxStock: 15,
      unitPrice: 150.0,
      totalValue: 300.0,
      supplier: "Storage Solutions",
      location: "Prateleira C-3",
      lastUpdate: "2024-01-13",
    },
    {
      id: 4,
      name: "Bateria Notebook Dell",
      category: "Baterias",
      brand: "Dell",
      model: "XCMRD",
      quantity: 8,
      minStock: 3,
      maxStock: 12,
      unitPrice: 120.0,
      totalValue: 960.0,
      supplier: "Dell Parts",
      location: "Armário D-1",
      lastUpdate: "2024-01-12",
    },
    {
      id: 5,
      name: "Teclado Notebook HP",
      category: "Teclados",
      brand: "HP",
      model: "9Z.N6SSF.00P",
      quantity: 1,
      minStock: 2,
      maxStock: 10,
      unitPrice: 85.0,
      totalValue: 85.0,
      supplier: "HP Service",
      location: "Gaveta E-1",
      lastUpdate: "2024-01-11",
    },
  ]

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return { status: "Sem estoque", color: "bg-red-100 text-red-800", icon: AlertTriangle }
    if (quantity <= minStock)
      return { status: "Estoque baixo", color: "bg-yellow-100 text-yellow-800", icon: TrendingDown }
    return { status: "Estoque OK", color: "bg-green-100 text-green-800", icon: TrendingUp }
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    const stockStatus = getStockStatus(item.quantity, item.minStock).status
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && stockStatus === "Estoque baixo") ||
      (stockFilter === "out" && stockStatus === "Sem estoque") ||
      (stockFilter === "ok" && stockStatus === "Estoque OK")

    return matchesSearch && matchesCategory && matchesStock
  })

  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = inventory.filter((item) => item.quantity <= item.minStock).length
  const outOfStockItems = inventory.filter((item) => item.quantity === 0).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Estoque</h1>
          <p className="text-muted-foreground">Gerencie peças e componentes</p>
        </div>
        <Button asChild>
          <Link href="/inventory/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Item
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">Produtos cadastrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Valor do estoque</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Itens com estoque baixo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sem Estoque</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Itens em falta</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre e busque itens do estoque</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome, marca ou modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="Telas">Telas</SelectItem>
                <SelectItem value="Memórias">Memórias</SelectItem>
                <SelectItem value="Armazenamento">Armazenamento</SelectItem>
                <SelectItem value="Baterias">Baterias</SelectItem>
                <SelectItem value="Teclados">Teclados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status do Estoque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ok">Estoque OK</SelectItem>
                <SelectItem value="low">Estoque baixo</SelectItem>
                <SelectItem value="out">Sem estoque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Itens</CardTitle>
          <CardDescription>{filteredInventory.length} item(ns) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor Unit.</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.minStock)
                const StatusIcon = stockStatus.icon

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.brand} - {item.model}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <p className="font-medium">{item.quantity}</p>
                        <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={stockStatus.color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {stockStatus.status}
                      </Badge>
                    </TableCell>
                    <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="font-medium">R$ {item.totalValue.toFixed(2)}</TableCell>
                    <TableCell className="text-sm">{item.location}</TableCell>
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
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
