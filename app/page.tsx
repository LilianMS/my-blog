import Link from "next/link";
import posts from "@/data/post.json";

import Image from "next/image";

export default function Home() {
return (
	<main className="flex min-h-screen flex-col items-center p-24">

		<h1 className="text-4xl font-bold mb-8">My Blog</h1>
		<ul className="space-y-4">
			{posts.map((post) => (
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
