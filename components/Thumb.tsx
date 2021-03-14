import Link from "next/link"
import { Contents } from "../types/blog"
import React from "react"
import moment from "moment"

const Thumb = ({ blog }: { blog: Contents }) => {
  return (
    <figure className="thumb-figure h-full rounded-lg overflow-hidden shadow transition-all duration-300 md:hover:shadow-md">
      <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
        <a className="flex flex-col">
          <div
            className="thumb-figure__head bg-gray-300 relative overflow-hidden"
            style={{ paddingTop: "62.5%", filter: "grayscale(1)" }}
          >
            {blog.thumb ? (
              <img src={blog.thumb[0].thumb.url} width="300" height="200" />
            ) : (
              <div className="bg-gray-300 w-full h-full"></div>
            )}
          </div>
          <div className="thumb-figure__body">
            <time className="thumb-figure__time">
              {moment(blog.createdAt).format("YYYY-MM-DD")}
            </time>
            <h2 className="thumb-figure__caption">{blog.title}</h2>
            {!!blog.tags.length && (
              <ul className="tag-list">
                {blog.tags.map((tag) => (
                  <li key={tag.id}>
                    <span>{tag.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </a>
      </Link>
    </figure>
  )
}

export default Thumb
