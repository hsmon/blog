import React from "react";
import Link from "next/link";
import { Key, Response } from "../types/blog";
import { GetStaticProps } from "next";

const Home = ({ blogs }: { blogs: Response["contents"] }) => {
  return (
    <div>
      <h2>最新の記事</h2>
      <ul>
        {blogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
            {blog.tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const key: Key = {
    headers: { "X-API-KEY": process.env.API_KEY! },
  };
  const res = await fetch(`https://hsmon.microcms.io/api/v1/blog/`, key);
  const data: Response = await res.json();
  return {
    props: {
      blogs: data.contents,
    },
  };
}

export default Home;
