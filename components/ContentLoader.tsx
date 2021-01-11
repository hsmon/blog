import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props: any) => (
  <ContentLoader
    speed={2}
    width={300}
    height={200}
    viewBox="0 0 300 200"
    backgroundColor="#d1d5d1"
    foregroundColor="#ebebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="300" height="200" />
  </ContentLoader>
)

export default Loader

