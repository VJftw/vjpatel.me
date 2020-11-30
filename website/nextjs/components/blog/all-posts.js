import PostPreview from './post-preview'

export default function AllPosts({ posts }) {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-gap-16 xl:col-gap-32 row-gap-20 lg:row-gap-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
