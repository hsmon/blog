import React from "react"
import { Contents, Key, Response } from "../../types/blog"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import Prism from 'prismjs'
import Markdown from 'markdown-to-jsx'
import moment from "moment"


type Props = { blog: Contents }
interface Context extends ParsedUrlQuery {
  id: Contents["id"]
}

const BlogId = ({ blog }: Props) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <article className="sm:prose-sm md:prose w-full min-w-full article">
      <div className="article__img">
        <img src={blog.thumb[0].thumb.url} />
      </div>
      <ul className="tag-list">
        {blog.tags.map((tag) => (
          <li key={tag.id}>
            <span>{tag.name}</span>
          </li>
        ))}
      </ul>
      <time className="thumb-article__time">{moment(blog.updatedAt).format("YYYY-MM-DD")}</time>
      <h2 className="article__title">{blog.title}</h2>
      <Markdown>
        {blog.body}
      </Markdown>
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key: Key = {
    headers: { "X-API-KEY": process.env.API_KEY! },
  }

  const res = await fetch("https://hsmon.microcms.io/api/v1/blog", key)
  const repos: Response = await res.json()

  const paths = repos.contents.map((repo) => `/blogs/${repo.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Context> = async (ctx) => {
  const { id } = ctx.params!
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY! },
  }
  const res = await fetch(`https://hsmon.microcms.io/api/v1/blog/${id}`, key)
  const blog = await res.json()

  return {
    props: {
      blog,
    },
    revalidate: 60,
  }
}

export default BlogId
