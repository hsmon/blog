import React from "react"
import { Contents, Key, Response } from "../../types/blog"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import Prism from "prismjs"
import Markdown from "markdown-to-jsx"
import moment from "moment"
import { SEO } from "../../components/SEO"
import { getSiteMetaData } from "../../functions/getSiteMetaData"

type Props = { blog: Contents }
interface Context extends ParsedUrlQuery {
  id: Contents["id"]
}

const siteMetadata = getSiteMetaData()

const BlogId: React.FC<Props> = ({ blog }: Props) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])
  if (!blog) return <p>ページの読み込みに失敗しました。</p>
  return (
    <>
      <SEO
        title={blog.title}
        description={blog?.description ?? siteMetadata.description}
        image={blog.thumb[0].thumb.url}
        type={"article"}
      />
      <article className="article sm:prose-sm md:prose pb-16 w-full min-w-full">
        <div
          className="article__img relative h-0 overflow-hidden bg-gray-300 rounded-lg"
          style={{ paddingTop: "52.5%" }}
        >
          <img
            src={blog.thumb[0].thumb.url}
            role="presentation"
            alt=""
            className="absolute inset-0 z-10 w-full h-full m-auto block"
          />
        </div>
        <ul className="tag-list">
          {blog.tags.map((tag) => (
            <li key={tag.id}>
              <span>{tag.name}</span>
            </li>
          ))}
        </ul>
        <time className="thumb-article__time text-sm mb-4 block">
          <span role="img" aria-label="投稿日時">
            📮
          </span>{" "}
          : {moment(blog.createdAt).format("YYYY-MM-DD")}
          <span role="img" aria-label="更新日時">
            🖌
          </span>{" "}
          :{" "}
          {blog.createdAt !== blog.updatedAt &&
            moment(blog.updatedAt).format("YYYY-MM-DD")}
        </time>
        <h2 className="article__title">{blog.title}</h2>
        <Markdown>{blog.body}</Markdown>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key: Key = {
    headers: { "X-API-KEY": process.env.API_KEY || "" },
  }

  const res = await fetch("https://hsmon.microcms.io/api/v1/blog", key)
  const repos: Response = await res.json()

  const paths = repos.contents.map((repo) => `/blogs/${repo.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Context> = async ({
  params,
}) => {
  let blog
  if (params) {
    const { id } = params
    const key = {
      headers: { "X-API-KEY": process.env.API_KEY || "" },
    }
    const res = await fetch(`https://hsmon.microcms.io/api/v1/blog/${id}`, key)
    blog = await res.json()
  }

  return {
    props: {
      blog,
    },
    revalidate: 60,
  }
}

export default BlogId
