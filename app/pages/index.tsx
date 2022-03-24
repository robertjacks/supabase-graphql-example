import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "urql";
import { gql } from "../gql";
import styles from "../styles/Home.module.css";

const FeedQuery = gql(/* GraphQL */ `
  query FeedQuery {
    feed: postCollection {
      edges {
        post: node {
          id
          title
          url
          upVotes: voteCollection(filter: { direction: { eq: "UP" } }) {
            totalCount
          }
          downVotes: voteCollection(filter: { direction: { eq: "DOWN" } }) {
            totalCount
          }
          comments: commentCollection {
            edges {
              node {
                id
                message
                profile {
                  id
                  username
                  avatarUrl
                }
              }
            }
            commentCount: totalCount
          }
        }
      }
    }
  }
`);

const Home: NextPage = () => {
  const [data] = useQuery({ query: FeedQuery });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <pre>
          <code>{JSON.stringify(data?.data, null, 2)}</code>
        </pre>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
