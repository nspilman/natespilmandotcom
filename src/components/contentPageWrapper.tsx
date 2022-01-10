import React from "react"
import Layout from "./layout"
import * as styles from "../components/layout.css"

const ContentPageWrapper: React.FC = ({ children }) => {
  return (
    <Layout>
      <div className={styles.contentPageWrapper}>{children}</div>
    </Layout>
  )
}

export default ContentPageWrapper
