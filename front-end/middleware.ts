import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Obter token do localStorage não é possível no middleware (server-side)
  // Vamos usar cookies ou headers para verificar autenticação
  const authToken = request.cookies.get('authToken')?.value
  
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth', '/auth/login', '/auth/register', '/']
  
  // Verificar se é uma rota pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // Se não tem token e está tentando acessar rota protegida
  if (!authToken && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  // Se tem token e está tentando acessar página de auth, redirecionar para dashboard
  if (authToken && (pathname.startsWith('/auth') || pathname === '/')) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}