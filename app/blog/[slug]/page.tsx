import Image from "next/image";

async function getPost(slug: string) {
	const res = await fetch(`http://localhost:3000/api/posts/${slug}`)
	return res.json();
}

interface PostProps {
	params: {
		slug: string;
	};
}

export default async function Post({ params }: PostProps) {
	const { slug } = await params;

	const post = await getPost(slug);

	if (!post || post.error) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-2xl font-bold">Postagem não encontrada</h1>
				<p className="text-gray-600 mt-4">O post que você está procurando não existe.</p>
			</div>
		);
	}

	const postContent = post.content;

	return (
		<main className="container mx-auto p-8 bg-pink-200">
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
				dangerouslySetInnerHTML={{ __html: post.content }}
			></article>
		</main>
	);
}