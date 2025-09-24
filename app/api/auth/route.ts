import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { password } = await request.json()
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true })
        response.cookies.set('admin-session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 24 horas
        })

        return response
    }

    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
}

export async function DELETE() {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('admin-session')
    return response
}