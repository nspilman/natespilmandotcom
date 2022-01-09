import React from "react"
import Layout from "./layout"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 5rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ContentPageWrapper: React.FC = ({ children }) => {
  return (
    <Layout>
      <Wrapper>{children}</Wrapper>
    </Layout>
  )
}

export default ContentPageWrapper
