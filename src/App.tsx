import "./App.css";
import FeedCard from "./components/FeedCard";
import Spinner from "./components/Spinner";
import { Fragment, useEffect, useRef } from "react";
import { FeedType, PageType } from "./utils/types";
import useFetchData from "./hooks/useFetchData";

function App() {
  const intersectionRef = useRef<HTMLDivElement>(null);
  // Using Custom hook for API Calls
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useFetchData();

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
    return (
      <div className="error">
        <div>
          <p>Something went wrong! Please try again.</p>
          <button onClick={() => refetch()} className="button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="scroll-container">
        {data?.pages?.map((page: PageType, idx: number) => {
          return (
            <Fragment key={idx}>
              {page?.nodes?.map((feed: FeedType) => {
                return <FeedCard key={feed?.node?.nid} data={feed} />;
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
