import React from "react";
import "../App.css";

type FeedCardProps = {
  data: any;
};
const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  return (
    <div className="feed-card">
      <img src={data?.node?.field_photo_image_section} alt="" />
      <div className="feed-card-details">
        <h2>{data?.node?.title}</h2>
      </div>
    </div>
  );
};

export default FeedCard;
