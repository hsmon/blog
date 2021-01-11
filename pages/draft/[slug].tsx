import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Response, Key } from "../../types/blog"
import React from "react"

const Page: any = ({ content } : {content: any}) => {
  if (!content) {
    return <p>error</p>
  }
  // 略
  return (
    <p>
      <p>現在プレビュー中です</p>
      {content}
    </p>
  )
};

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
  const content = await fetch(
    `https://hsmon.microcms.io/api/v1/blog/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ""
    }`,
    { headers: { "X-API-KEY": process.env.apiKey || "" } }
  ).then((res) => res.json())
  return {
    props: {
      content,
    },
  }
}

export default Page