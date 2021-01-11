import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import {Contents, Response, Key } from "../../types/blog"
import React from "react"
import Prism from 'prismjs'
import Markdown from 'markdown-to-jsx'
import moment from "moment"

type Props = { blog: Contents }

const Page = ({ blog }: Props) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <article className="sm:prose-sm md:prose w-full min-w-full article">
      <p className="text-5xl">プレビュー中です！</p>
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

  const paths = repos.contents.map((repo) => `/draft/${repo.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const draftKey = context.previewData?.draftKey
  const blog = await fetch(
    `https://hsmon.microcms.io/api/v1/blog/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ""
    }`,
    { headers: { "X-API-KEY": process.env.API_KEY || "" } }
  ).then((res) => res.json())
  return {
    props: {
      blog,
    },
  }
}

export default Page