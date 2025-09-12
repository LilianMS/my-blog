import posts from "@/data/post.json";
import Image from "next/image";
import { marked } from "marked";


interface PostProps {
	params: {
		slug: string;
	};
}

export default async function Post({ params }: PostProps) {
	const { slug } = await params;

	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="">Postagem não encontrada</h1>
			</div>
		);
	}

	const postContent = marked(post.content);

	return (
		<main className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
			<p className="text-sm text-gray-500 mb-6">Publicado em: {post.date}</p>
			{post.image && (
				<div className="mb-8">
					<Image
						src={post.image}
						alt={post.title}
						width={800}
						height={400}
						className="w-full h-auto rounded"
					/>
				</div>
			)}
			<article
				className="prose"
				dangerouslySetInnerHTML={{ __html: marked(post.content) }}
			></article>
		</main>
	);
}