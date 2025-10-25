'use client'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RecycleIcon } from 'lucide-react'

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulação de login estático
    setTimeout(() => {
      console.log('Login realizado com:', { email, password })
      setIsLoading(false)
      // Aqui você pode adicionar redirecionamento ou outras ações
    }, 1000)
  }

  return (
    <div className="w-full">
      <div className="lg:hidden mb-8 flex items-center justify-center">
        <Image src="/conflu04.png" alt="Conflu" width={350} height={350} />
      </div>
      
      <Card className="mx-auto w-[380px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">
          Login
        </CardTitle>
        <CardDescription>
          Mantenha-se organizado e centralize toda informação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-3 flex w-full">
          <Button
          
            className="w-full"
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <RecycleIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Image
                alt="logo google"
                width={20}
                height={20}
                src={'google.svg'}
                className="mr-2"
              />
            )}
            {isLoading ? 'Entrando...' : 'Sign in with Google'}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-xs">
          Ao clicar em continuar, você reconhece que leu e concorda com os
          termos da Conflu{' '}
          <Link href={'#'} className="underline">
            Termos de serviço
          </Link>{' '}
          e{' '}
          <Link href='/policy' className="underline">
            Politica de privacidade
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
    </div>
  )
}