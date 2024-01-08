import React, { memo } from "react";

type Props = {
  embed: string;
};

const Video = ({ embed }: Props) => {
  return (
    <iframe
      className="relative z-[100]"
      width="100%"
      height={435}
      src={`https://www.youtube.com/embed/${embed}`}
      allowFullScreen
    />
  );
};

export default memo(Video);
