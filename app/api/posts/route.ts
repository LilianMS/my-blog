import { NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { PostType } from '@/types/types';
import posts from '@/data/post.json';
import path from 'path';

// GET /api/posts
export async function GET() {
  return NextResponse.json(posts);
}

// POST /api/posts
// export async function POST(request: Request) {
//   const newPost = await request.json();
//   posts.push(newPost);
//   return NextResponse.json(newPost, { status: 201 });
// }

export async function POST(request: Request) {
    const newPost: PostType = await request.json()

    const filePath = path.join(process.cwd(), 'data', 'post.json')
    const fileData = readFileSync(filePath, 'utf-8')
    const posts: PostType[] = JSON.parse(fileData)

    posts.push(newPost)

    writeFileSync(filePath, JSON.stringify(posts, null, 2))

    return NextResponse.json(newPost, { status: 201 })
}
