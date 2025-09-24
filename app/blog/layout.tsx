// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  )
}