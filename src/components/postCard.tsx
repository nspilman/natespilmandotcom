import { Link } from "gatsby"
import React from "react"
import formattedDateString from "../utils/formattedDateString"
import { headers, textColorPrimary } from "../styles/theme.css"
import * as styles from "../components/layout.css"

const Post = ({ post }) => {
  const { fields, frontmatter } = post
  const { title, date, description, tags } = frontmatter
  return (
    <div className={styles.cardBlog}>
      <Link to={fields.slug} style={{ textDecoration: "none" }}>
        <h3 className={headers.h3}>{title}</h3>
        <p className={textColorPrimary}>{formattedDateString(date)}</p>
        <p className={textColorPrimary}>{description}</p>
        <p>
          {tags.map(tag => (
            <span className={styles.tag} key={tag}>
              #{tag}{" "}
            </span>
          ))}
        </p>
      </Link>
    </div>
  )
}

export default Post
