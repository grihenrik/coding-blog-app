import Image from "next/image";
import React from "react";

type AvatarSize = "s" | "m" | "l" | "full";

type AvatarProps = {
  size?: AvatarSize;
  url?: string;
  alt?: string;
};

const sizeClass = {
  s: "h-6 w-6",
  m: "h-8 w-8",
  l: "h-10 w-10",
  full: "h-full w-full",
};

type sizeImgType = {
  [key in AvatarSize]: number;
};

const sizeImg: sizeImgType = {
  s: 24,
  m: 32,
  l: 40,
  full: 100,
};

const Avatar = ({ size = "m", url, alt }: AvatarProps) => {
  return (
    <div
      className={`relative flex ${sizeClass[size]} overflow-hidden rounded-full`}
    >
      {url && (
        <Image
          src={url}
          alt={alt ?? ""}
          className="rounded-full object-cover"
          width={sizeImg[size]}
          height={sizeImg[size]}
          fill={size === "full" ? true : false}
        />
      )}
      {!url && (
        <div className="flex h-full w-full items-center justify-center bg-gray-500 text-white">
          {alt?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
