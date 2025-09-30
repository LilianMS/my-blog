import { NextResponse } from 'next/server'
import { writeFileSync, readFileSync } from 'fs'
import posts from '@/data/post.json'
import path from 'path'

// api/posts/[slug]/route.ts
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const post = posts.find(p => p.slug === slug)
    if (!post) {
        return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
    }
    return NextResponse.json(post)
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'data', 'post.json')
    const fileData = readFileSync(filePath, 'utf-8')
    const posts = JSON.parse(fileData)

    const updatedPosts = posts.filter((p: any) => p.slug !== slug)

    writeFileSync(filePath, JSON.stringify(updatedPosts, null, 2))

    return NextResponse.json({ success: true })
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const updatedPost = await request.json()

    const filePath = path.join(process.cwd(), 'data', 'post.json')
    const fileData = readFileSync(filePath, 'utf-8')
    const posts = JSON.parse(fileData)

    const postIndex = posts.findIndex((p: any) => p.slug === slug)
    if (postIndex === -1) {
        return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
    }

    posts[postIndex] = { ...posts[postIndex], ...updatedPost }

    writeFileSync(filePath, JSON.stringify(posts, null, 2))

    return NextResponse.json(posts[postIndex])
}
