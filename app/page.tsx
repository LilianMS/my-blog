import { PostType } from "@/types/types";
import Link from "next/link";

async function getPosts() {
	// Durante build/pré-renderização, usa import direto
	if (typeof window === 'undefined' && !process.env.VERCEL_URL) {
		const posts = await import('@/data/post.json')
		return posts.default
	}

	// Em runtime (dev/produção), usa API
	const response = await fetch('/api/posts')
	return response.json()
}

export default async function Home() {
	const posts = await getPosts()
	return (
		<main className="flex min-h-screen flex-col items-center p-24">

			<h1 className="text-4xl font-bold mb-8">My Blog</h1>
			<ul className="space-y-4">
				{posts.map((post: PostType) => (
					<li key={post.id} className="border-b pb-4">
						<Link href={`/blog/${post.slug}`} className="hover:text-blue-500">
							<h2 className="text-2xl font-semibold">{post.title}</h2>
							<p className="text-sm text-gray-500">Publicado em: {post.date}</p>
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
