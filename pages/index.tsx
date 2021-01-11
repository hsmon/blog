import React from "react"
import { Key, Response } from "../types/blog"
import { GetStaticProps } from "next"
import Thumb from "../components/Thumb"

const Home = ({ blogs }: { blogs: Response["contents"] }) => {
  return (
    <section className="px-2">
      <h2 className="font-semibold pb-4 text-l">最新の記事</h2>
      <ul className="thumb-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="thumb-list__item">
            <Thumb blog={blog}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const key: Key = {
    headers: { "X-API-KEY": process.env.API_KEY! },
  }
  const res = await fetch(`https://hsmon.microcms.io/api/v1/blog/`, key)
  const data: Response = await res.json()
  return {
    props: {
      blogs: data.contents,
    },
  }
}

export default Home
