"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Building, Bell, Database, Users, Shield, Download, Upload, Trash2, Plus } from "lucide-react"

export default function SettingsPage() {
  const [companyData, setCompanyData] = useState({
    name: "TechFix - Assistência Técnica",
    cnpj: "12.345.678/0001-90",
    phone: "(11) 3456-7890",
    email: "contato@techfix.com.br",
    address: "Rua da Tecnologia, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    website: "www.techfix.com.br",
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlert: true,
    overdueOrderAlert: true,
    backupFrequency: "daily",
    defaultOrderStatus: "Em análise",
    defaultPriority: "Média",
  })

  const [users] = useState([
    {
      id: 1,
      name: "Admin Principal",
      email: "admin@techfix.com.br",
      role: "Administrador",
      status: "Ativo",
      lastLogin: "2024-01-15 14:30",
    },
    {
      id: 2,
      name: "João Técnico",
      email: "joao@techfix.com.br",
      role: "Técnico",
      status: "Ativo",
      lastLogin: "2024-01-15 09:15",
    },
    {
      id: 3,
      name: "Maria Atendente",
      email: "maria@techfix.com.br",
      role: "Atendente",
      status: "Inativo",
      lastLogin: "2024-01-10 16:45",
    },
  ])

  const handleCompanyDataChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSystemSettingChange = (field: string, value: boolean | string) => {
    setSystemSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveCompanyData = () => {
    console.log("Salvando dados da empresa:", companyData)
    alert("Dados da empresa salvos com sucesso!")
  }

  const handleSaveSystemSettings = () => {
    console.log("Salvando configurações do sistema:", systemSettings)
    alert("Configurações do sistema salvas com sucesso!")
  }

  const handleBackup = () => {
    console.log("Iniciando backup...")
    alert("Backup iniciado! Você será notificado quando concluído.")
  }

  const handleRestore = () => {
    console.log("Iniciando restauração...")
    alert("Selecione o arquivo de backup para restaurar.")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <CardTitle>Dados da Empresa</CardTitle>
              </div>
              <CardDescription>Informações básicas da sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => handleCompanyDataChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={companyData.cnpj}
                    onChange={(e) => handleCompanyDataChange("cnpj", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => handleCompanyDataChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => handleCompanyDataChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={companyData.address}
                  onChange={(e) => handleCompanyDataChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={companyData.city}
                    onChange={(e) => handleCompanyDataChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={companyData.state}
                    onChange={(e) => handleCompanyDataChange("state", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={companyData.zipCode}
                    onChange={(e) => handleCompanyDataChange("zipCode", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyData.website}
                  onChange={(e) => handleCompanyDataChange("website", e.target.value)}
                />
              </div>

              <Button onClick={handleSaveCompanyData} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Salvar Dados da Empresa
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notificações</CardTitle>
              </div>
              <CardDescription>Configure como você quer receber alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">Receba alertas importantes por e-mail</p>
                </div>
                <Switch
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => handleSystemSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-muted-foreground">Receba alertas urgentes por SMS</p>
                </div>
                <Switch
                  checked={systemSettings.smsNotifications}
                  onCheckedChange={(checked) => handleSystemSettingChange("smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alerta de Estoque Baixo</Label>
                  <p className="text-sm text-muted-foreground">Notificar quando itens estiverem com estoque baixo</p>
                </div>
                <Switch
                  checked={systemSettings.lowStockAlert}
                  onCheckedChange={(checked) => handleSystemSettingChange("lowStockAlert", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alerta de Prazo Vencido</Label>
                  <p className="text-sm text-muted-foreground">Notificar sobre ordens com prazo vencido</p>
                </div>
                <Switch
                  checked={systemSettings.overdueOrderAlert}
                  onCheckedChange={(checked) => handleSystemSettingChange("overdueOrderAlert", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações Padrão</CardTitle>
              <CardDescription>Valores padrão para novas ordens de serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status Padrão</Label>
                  <Select
                    value={systemSettings.defaultOrderStatus}
                    onValueChange={(value) => handleSystemSettingChange("defaultOrderStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Em análise">Em análise</SelectItem>
                      <SelectItem value="Aguardando peças">Aguardando peças</SelectItem>
                      <SelectItem value="Em reparo">Em reparo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Prioridade Padrão</Label>
                  <Select
                    value={systemSettings.defaultPriority}
                    onValueChange={(value) => handleSystemSettingChange("defaultPriority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveSystemSettings} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações do Sistema
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <div>
                    <CardTitle>Usuários do Sistema</CardTitle>
                    <CardDescription>Gerencie os usuários que têm acesso ao sistema</CardDescription>
                  </div>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.role} • Último acesso: {user.lastLogin}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>Backup e Restauração</CardTitle>
              </div>
              <CardDescription>Faça backup dos seus dados e restaure quando necessário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">Fazer backup automaticamente dos dados</p>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => handleSystemSettingChange("autoBackup", checked)}
                />
              </div>

              {systemSettings.autoBackup && (
                <div className="space-y-2">
                  <Label>Frequência do Backup</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => handleSystemSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleBackup} className="h-20 flex-col gap-2">
                  <Download className="h-6 w-6" />
                  Fazer Backup Agora
                </Button>
                <Button onClick={handleRestore} variant="outline" className="h-20 flex-col gap-2">
                  <Upload className="h-6 w-6" />
                  Restaurar Backup
                </Button>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Faça backups regulares dos seus dados. O último backup foi realizado em
                  15/01/2024 às 02:00.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
