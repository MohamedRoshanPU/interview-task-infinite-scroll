import { useInfiniteQuery } from "@tanstack/react-query";
import { PageParamType, PageType } from "../utils/types";

const useFetchData = () => {
  // Function for fetching data
  const fetchData = async ({ pageParam }: PageParamType) => {
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: PageType, _, lastPageParam: number) => {
      if (lastPage?.nodes?.length == 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};

export default useFetchData;
