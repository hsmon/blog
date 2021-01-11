import Link from "next/link"
import { Contents } from "../types/blog"
import Loader from '../components/ContentLoader'
import React from "react"

const Thumb = ({blog}:{blog:Contents}) => {
  return (
    <figure className="thumb-figure">
      <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
        <a>
          <div className="thumb-figure__head">
            <Loader className="absolute inset-0 z-10" />
            <img src={blog.thumb[0].thumb.url} width="300" height="200" />
          </div>
          <div className="thumb-figure__body">
            <h2 className="thumb-figure__caption">{blog.title}</h2>
            <ul className="tag-list">
              {blog.tags.map((tag) => (
                <li key={tag.id}>
                  <span>{tag.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </a>
      </Link>
    </figure>
  )
}

export default Thumb