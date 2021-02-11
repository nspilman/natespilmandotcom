import { Link } from "gatsby"
import React from "react"
import formattedDateString from "../utils/formattedDateString"

const Post = ({post}) => {
    const {fields, frontmatter} = post;
    const {title,date, description, tags} = frontmatter;
    return (
    <div className="card-blog">
    <Link to={fields.slug} style={{textDecoration:'none'}}>
      <h3>{ title }</h3>
      <p>{ formattedDateString(date) }</p>
      <p>{description }</p>
      <p className="tags">
          {tags.map(tag => <span className = "tag" key={tag}>#{tag} </span>) }
         </p>
    </Link>
  </div>
)
}

export default Post
