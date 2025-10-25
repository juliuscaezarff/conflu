'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeftIcon } from 'lucide-react'
import { useAuth } from '@/providers/auth-provider'
import { Warp } from '@paper-design/shaders-react'
import { useContainerDimensions } from '@/hooks/use-container-dimensions'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const { ref, dimensions } = useContainerDimensions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validação de senha
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setIsLoading(true)

    try {
      await register(fullName, email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative">
      <Link
        href="/"
        className="fixed top-4 left-4 text-base font-semibold z-50 text-primary transition-colors flex items-center gap-2 py-2"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar
      </Link>
      <div className="min-h-screen flex px-3 py-3">
        <div
          ref={ref}
          className="relative hidden w-1/2 lg:block overflow-hidden rounded-lg"
        >
          <div className="absolute inset-0">
            <Warp
              width={dimensions.width}
              height={dimensions.height}
              colors={["#161f36", "#c3a169", "#101c3d"]}
              proportion={0.45}
              softness={1}
              distortion={0.25}
              swirl={0.8}
              swirlIterations={10}
              shape="checks"
              shapeScale={0.1}
              speed={1}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image
              src="/conflu-white.png"
              alt="Conflu"
              width={350}
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full">
            <div className="lg:hidden mb-8 flex items-center justify-center">
              <Image src="/conflu04.png" alt="Conflu" width={350} height={350} />
            </div>
            
            <Card className="mx-auto w-[380px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-semibold">
                  Criar Conta
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para criar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      'Criar Conta'
                    )}
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm">
                  Já tem uma conta?{' '}
                  <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Faça login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}