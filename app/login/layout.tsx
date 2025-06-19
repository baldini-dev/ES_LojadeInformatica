import type React from "react"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout limpo para a página de login - sem sidebar nem header
  return <div className="min-h-screen">{children}</div>
}
