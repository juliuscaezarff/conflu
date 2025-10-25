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
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RecycleIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
      await signIn('google', {
        callbackUrl: '/dashboard'
      })
    } catch (error) {
      console.error('Erro no login com Google:', error)
    } finally {
      setIsLoading(false)
    }
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
            onClick={handleGoogleLogin}
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
            {isLoading ? 'Entrando...' : 'Entrar com Google'}
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