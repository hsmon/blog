import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Contents, Response, Key } from "../../types/blog"
import React from "react"
import Prism from "prismjs"
import Markdown from "markdown-to-jsx"
import moment from "moment"
import { SEO } from "../../components/SEO"
import { getSiteMetaData } from "../../functions/getSiteMetaData"

type Props = { blog: Contents }

const siteMetadata = getSiteMetaData()

const Page = ({ blog }: Props) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <SEO
        title={blog.title}
        description={blog?.description ?? siteMetadata.description}
        image={
          blog.thumb[0]?.thumb !== undefined
            ? blog.thumb[0].thumb.url
            : "/favicon.svg"
        }
        type={"article"}
      />
      <article className="sm:prose-sm md:prose w-full min-w-full article">
        <p className="text-5xl">プレビュー中です！</p>
        <div className="article__img">
          {blog.thumb[0]?.thumb !== undefined ? (
            <img
              src={blog.thumb[0].thumb.url}
              role="presentation"
              alt=""
              className="absolute inset-0 z-10 w-full h-full m-auto block"
            />
          ) : (
            <div
              className="bg-gray-300 w-full h-full rounded-lg"
              style={{ paddingTop: "52.5%" }}
            ></div>
          )}
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
