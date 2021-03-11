import { Post } from "../types";
import classNames from "classnames";
import Link from "next/link";
import ActionButton from "./ActionButton";
import dayis from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Axios from "axios";
import content from "*.svg";
import { useRouter } from "next/router";
import { useAuthState } from "../context/auth";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
  revalidate: Function;
}
export default function PostCard({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  revalidate,
}: PostCardProps) {
  // console.log(commentCount);
  const router = useRouter();
  const isInSubPage = router.pathname === "/r/[sub]"; // /r/[sub]
  const { authenticated } = useAuthState();

  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    if (value === userVote) value = 0; //??? deleting voting data...
    //when voted was up(+1), click up again makes my vote canceled,
    // otherwise, voting change from up to down, or vice versa....
    console.log("Vote Value::", value);
    console.log("userVote Value::", userVote);

    try {
      const res = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });

      if (revalidate) revalidate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      key={identifier}
      className="flex mb-4 bg-white rounded"
      id={identifier}
    >
      {/* vote section */}
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
        {/* upvote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:text-red-500"
          onClick={() => vote(1)}
        >
          <i
            className={classNames("fas fa-arrow-up", {
              "text-red-500": userVote === 1,
            })}
          />
        </div>
        {/* score */}
        <p className="text-xs fondt-bold">{voteScore}</p>
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:text-blue-500"
          onClick={() => vote(-1)}
        >
          <i
            className={classNames("fas fa-arrow-down", {
              "text-blue-500": userVote === -1,
            })}
          />
        </div>
      </div>
      {/* Post data section */}
      <div className="w-full p-2">
        <div className="flex items-center">
          {!isInSubPage && (
            <>
              <Link href={`/r/${subName}`}>
                <img
                  src={sub.imageUrl}
                  alt="SubImage"
                  className="w-6 h-6 mr-1 rounded-full cursor-point"
                />
                {/* <a className="w-6 h-6 mr-1 rounded-full">
                  <i className="fas fa-user"></i>
                </a> */}
              </Link>
              <Link href={`/r/${subName}`}>
                <a className="text-xs font-bold cursor-pointer hover:underline">
                  /r/{subName}
                </a>
              </Link>
              <span className="mx-1 text-xs text-gray-500">•</span>
            </>
          )}
          <p className="text-xs text-gray-500">
            Posted by
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/{username}</a>
            </Link>
            <Link href={url}>
              <a className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg font-medium">title:{title}</a>
        </Link>
        <p className="my-1 text-sm">body:{body}</p>
        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                <span className="font-bold">{commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <i className="mr-1 fas fa-share fa-xs"></i>
            <span className="font-bold">Share</span>
          </ActionButton>
          <ActionButton>
            <i className="mr-1 fas fa-bookmark fa-xs"></i>
            <span className="font-bold">Save</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
