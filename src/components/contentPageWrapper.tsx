import React from "react"
import Layout from "./layout"

const ContentPageWrapper : React.FC = ({ children } ) => {
    return (<Layout>
        <div className="content-page-wrapper"
            style={
                {
                  padding:'5rem',
                }
                }
        >
        {children}
        </div>
    </Layout>)
}

export default ContentPageWrapper