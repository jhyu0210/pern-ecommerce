import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Post, Sub } from "../types";
import useSWR, { useSWRInfinite } from "swr";
import { useAuthState } from "../context/auth";
// import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const [observedPost, setObservedPost] = useState("");

  const { authenticated } = useAuthState();

  //infinite scroll
  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  // const { data: posts, revalidate } = useSWR("/posts");
  const isInitialLoading = !data && !error;

  const posts: Post[] = data ? [].concat(...data) : [];

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = posts[posts.length - 1].identifier;
    console.log(">>>>>ID:::", id);
    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (elem: HTMLElement) => {
    console.log("observeElement", elem);
    if (!elem) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached bottom of post");
          setPage(page + 1);
          observer.unobserve(elem);
        }
      },
      { threshold: 1 }
    );
    observer.observe(elem);
  };

  return (
    <Fragment>
      <Head>
        <title>reddit: front page of the internet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex pt-4">
        <div className="w-full px-4 md:w-160 md:p-0">
          {isInitialLoading && <p className="text-lg test-center">Loading</p>}
          {posts?.map((post) => (
            <PostCard
              post={post}
              key={post.identifier}
              revalidate={revalidate}
            />
          ))}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center">Loading More...</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center py-2 text-xs border-b ps-4"
                >
                  <Link href={`/r/sub.name`}>
                    <a className="ml-2">
                      <Image
                        src={sub.imageUrl}
                        // src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        className="rounded-full cursor-pointer"
                        alt="Sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-point">
                      /r/{sub.name}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
