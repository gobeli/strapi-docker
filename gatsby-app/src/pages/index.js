import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { excerpt } from "../utils/helpers";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allStrapiPost.edges;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title || node.slug;
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4)
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.createdAt}</small>
              <p dangerouslySetInnerHTML={{ __html: excerpt(node.content) }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allStrapiPost {
      edges {
        node {
          title
          content
          slug
          createdAt
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
`;
