type FeedDetailType = {
  title: string;
  nid_dont_use: string;
  field_photo_image_section: string;
  path: string;
  nid: string;
  photo_image_nids: string;
  ImageStyle_thumbnail: string;
  last_update: number;
  views_count: number;
  author_uid: number;
  author_name: string;
};

export type FeedType = {
  node: FeedDetailType;
};

export type DataType = {
  pageParams: Array<number>;
  pages: Array<PageType>;
};

export type PageType = {
  nodes: Array<FeedType>;
};

export type PageParamType = {
  pageParam: number;
};
