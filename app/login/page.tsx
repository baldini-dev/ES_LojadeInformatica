"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, Shield, User, AlertCircle, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("") // Limpar erro ao digitar
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validações básicas
    if (!formData.email || !formData.password || !formData.userType) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      setIsLoading(false)
      return
    }

    // Simulação de autenticação
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simular delay da API

      // Usuários de exemplo para demonstração
      const validUsers = [
        { email: "admin@techfix.com.br", password: "admin123", type: "admin", name: "Administrador" },
        { email: "tecnico@techfix.com.br", password: "tecnico123", type: "tecnico", name: "João Técnico" },
        { email: "atendente@techfix.com.br", password: "atendente123", type: "atendente", name: "Maria Atendente" },
        { email: "usuario@techfix.com.br", password: "usuario123", type: "usuario", name: "Carlos Cliente" },
      ]

      const user = validUsers.find(
        (u) => u.email === formData.email && u.password === formData.password && u.type === formData.userType,
      )

      if (user) {
        // Salvar dados do usuário (em um app real, usaria contexto/estado global)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("isAuthenticated", "true")

        // Redirecionar para dashboard
        router.push("/")
      } else {
        setError("Credenciais inválidas. Verifique email, senha e tipo de usuário.")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    { value: "admin", label: "Administrador", icon: Shield },
    { value: "tecnico", label: "Técnico", icon: User },
    { value: "atendente", label: "Atendente", icon: User },
    { value: "usuario", label: "Usuário/Cliente", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src="/logo.svg" alt="TechFix" className="h-12" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao TechFix</h1>
            <p className="text-gray-600">Faça login para acessar o sistema</p>
          </div>
        </div>

        {/* Formulário de Login */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Login do Sistema
            </CardTitle>
            <CardDescription>Entre com suas credenciais para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo de Usuário */}
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuário *</Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu tipo de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Lembrar-me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">
                  Lembrar-me neste dispositivo
                </Label>
              </div>

              {/* Erro */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Botão de Login */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Entrar no Sistema
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 TechFix - Sistema de Gestão</p>
          <p>Precisa de ajuda? Entre em contato com o administrador</p>
        </div>
      </div>
    </div>
  )
}
