"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload, X, Camera, ImageIcon, AlertCircle } from "lucide-react"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  type: string
}

export default function NewOrderPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    device: "",
    brand: "",
    model: "",
    problem: "",
    observations: "",
    priority: "",
    estimatedValue: "",
    estimatedCompletion: "",
  })

  const [deviceImages, setDeviceImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Se for cliente, preencher automaticamente os dados
      if (parsedUser.type === "usuario") {
        setFormData((prev) => ({
          ...prev,
          clientName: parsedUser.name,
          clientEmail: parsedUser.email,
        }))
      }
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    // Limitar a 5 imagens
    const remainingSlots = 5 - deviceImages.length
    const filesToAdd = files.slice(0, remainingSlots)

    if (filesToAdd.length > 0) {
      setDeviceImages((prev) => [...prev, ...filesToAdd])

      // Criar URLs de preview
      filesToAdd.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreviewUrls((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }

    // Limpar o input
    e.target.value = ""
  }

  const removeImage = (index: number) => {
    setDeviceImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Criar FormData para incluir as imagens
    const submitData = new FormData()

    // Adicionar dados do formulário
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value)
    })

    // Adicionar imagens
    deviceImages.forEach((image, index) => {
      submitData.append(`deviceImage_${index}`, image)
    })

    console.log("Dados da ordem:", formData)
    console.log("Imagens do dispositivo:", deviceImages)
    alert("Ordem de serviço criada com sucesso!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nova Ordem de Serviço</h1>
          <p className="text-muted-foreground">Cadastre uma nova ordem de serviço</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados do Cliente</CardTitle>
            <CardDescription>Informações de contato do cliente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nome do Cliente *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  placeholder="Nome completo"
                  required
                  readOnly={user?.type === "usuario"}
                  className={user?.type === "usuario" ? "bg-gray-50" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Telefone *</Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">E-mail</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                placeholder="cliente@email.com"
                readOnly={user?.type === "usuario"}
                className={user?.type === "usuario" ? "bg-gray-50" : ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Equipamento</CardTitle>
            <CardDescription>Informações sobre o dispositivo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="device">Tipo de Dispositivo *</Label>
                <Select value={formData.device} onValueChange={(value) => handleInputChange("device", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook</SelectItem>
                    <SelectItem value="desktop">PC Desktop</SelectItem>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="impressora">Impressora</SelectItem>
                    <SelectItem value="monitor">Monitor</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Ex: Dell, HP, Samsung"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Ex: Inspiron 15, Galaxy S21"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fotos do Dispositivo</CardTitle>
            <CardDescription>
              Anexe fotos do equipamento para documentar o estado inicial (máximo 5 fotos)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="deviceImages" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Clique para adicionar fotos</p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG até 10MB cada ({deviceImages.length}/5 fotos)
                        </p>
                      </div>
                    </div>
                  </div>
                </Label>
                <Input
                  id="deviceImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={deviceImages.length >= 5}
                />
              </div>
            </div>

            {/* Preview das imagens */}
            {imagePreviewUrls.length > 0 && (
              <div className="space-y-2">
                <Label>Fotos Anexadas:</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Foto do dispositivo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <ImageIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Dicas para boas fotos:</p>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>• Fotografe danos visíveis, arranhões ou defeitos</li>
                  <li>• Inclua etiquetas com número de série se visível</li>
                  <li>• Tire fotos de diferentes ângulos do dispositivo</li>
                  <li>• Use boa iluminação para melhor qualidade</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Descrição do Problema</CardTitle>
            <CardDescription>Detalhes sobre o problema relatado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="problem">Problema Relatado *</Label>
              <Textarea
                id="problem"
                value={formData.problem}
                onChange={(e) => handleInputChange("problem", e.target.value)}
                placeholder="Descreva o problema relatado pelo cliente..."
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="observations">Observações Técnicas</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => handleInputChange("observations", e.target.value)}
                placeholder="Observações adicionais, diagnóstico inicial..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {user?.type !== "usuario" && (
          <Card>
            <CardHeader>
              <CardTitle>Informações do Serviço</CardTitle>
              <CardDescription>Prioridade, valor e prazo estimado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade *</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Valor Estimado</Label>
                  <Input
                    id="estimatedValue"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedCompletion">Previsão de Entrega</Label>
                  <Input
                    id="estimatedCompletion"
                    type="date"
                    value={formData.estimatedCompletion}
                    onChange={(e) => handleInputChange("estimatedCompletion", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {user?.type === "usuario" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Informação importante:</p>
                  <p className="mt-1">
                    Após o envio da sua solicitação, nossa equipe técnica irá analisar o equipamento e definir a
                    prioridade, valor estimado e prazo de entrega. Você será contactado em breve com essas informações.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Criar Ordem de Serviço
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/orders">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
