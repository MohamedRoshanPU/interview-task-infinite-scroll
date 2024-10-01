import { useInfiniteQuery } from "@tanstack/react-query";
import "./App.css";
import FeedCard from "./components/FeedCard";
import Spinner from "./components/Spinner";
import { Fragment, useEffect, useRef } from "react";

function App() {
  const intersectionRef = useRef<HTMLDivElement>(null);
  // Function for Api call
  const fetchData = async ({ pageParam }: any) => {
    let res = await fetch(
      `https://proxy.cors.sh/https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${pageParam}`,
      {
        headers: {
          "x-cors-api-key": "temp_78118e5223aa4b26ca16b40e3087bfa4",
        },
      }
    );
    return res.json();
  };

  // Using RTK Query for infinite api calls
  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam: number) => {
      if (lastPage?.nodes?.length == 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  console.log(`App,  : data_values`, data);

  // Using intersection observer for finding whether the user has scrolled to the bottom of the page
  useEffect(() => {
    const observer = new IntersectionObserver(([entries]) => {
      if (entries?.isIntersecting) {
        hasNextPage && fetchNextPage();
      }
    });

    observer.observe(intersectionRef.current as HTMLDivElement);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="container">
      <div className="scroll-container">
        {data?.pages?.map((page: any, idx: number) => {
          return (
            <Fragment key={idx}>
              {page?.nodes?.map((feed: any) => {
                return <FeedCard key={"k"} data={feed} />;
              })}
            </Fragment>
          );
        })}
        <div ref={intersectionRef}>
          {(isFetching || isFetchingNextPage) && <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default App;
