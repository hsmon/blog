import React from "react"
import { Contents, Key, Response } from "../../types/blog"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { ParsedUrlQuery } from "querystring"

type Props = { blog: Contents }
interface Context extends ParsedUrlQuery {
  id: Contents["id"]
}

const BlogId = ({ blog }: Props) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        {blog.tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <span>{tag.name}</span>
          </React.Fragment>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
    </div>
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
