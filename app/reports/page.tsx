import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Clock, Wrench } from "lucide-react"

export default function ReportsPage() {
  const monthlyStats = [
    { month: "Janeiro", orders: 45, revenue: 8500, avgTime: 3.2 },
    { month: "Dezembro", orders: 38, revenue: 7200, avgTime: 2.8 },
    { month: "Novembro", orders: 42, revenue: 7800, avgTime: 3.5 },
  ]

  const topServices = [
    { service: "Formatação/Reinstalação", count: 28, percentage: 35 },
    { service: "Troca de Tela", count: 18, percentage: 22 },
    { service: "Limpeza/Manutenção", count: 15, percentage: 19 },
    { service: "Reparo de Hardware", count: 12, percentage: 15 },
    { service: "Recuperação de Dados", count: 7, percentage: 9 },
  ]

  const deviceTypes = [
    { type: "Notebooks", count: 35, percentage: 44 },
    { type: "Smartphones", count: 25, percentage: 31 },
    { type: "PCs Desktop", count: 15, percentage: 19 },
    { type: "Tablets", count: 5, percentage: 6 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Análise de desempenho e estatísticas</p>
      </div>

      {/* Resumo Mensal */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordens Este Mês</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 dias</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+14%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico dos Últimos Meses</CardTitle>
          <CardDescription>Comparativo de desempenho mensal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{stat.month}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{stat.orders} ordens</span>
                    <span>R$ {stat.revenue.toLocaleString()}</span>
                    <span>{stat.avgTime} dias médio</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Bom desempenho
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Serviços Mais Solicitados */}
        <Card>
          <CardHeader>
            <CardTitle>Serviços Mais Solicitados</CardTitle>
            <CardDescription>Top 5 tipos de serviço</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{service.service}</span>
                    <span className="text-sm text-muted-foreground">
                      {service.count} ({service.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${service.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Dispositivos */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Dispositivos</CardTitle>
            <CardDescription>Distribuição por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceTypes.map((device, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{device.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {device.count} ({device.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${device.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
