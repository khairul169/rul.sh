import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import Blurhash from "./blurhash";

type ImageProps = React.ComponentProps<"img"> & {
  blurHash?: { data: string; width?: number; height?: number };
  imgClassName?: string;
};

const Image = ({ className, imgClassName, blurHash, ...props }: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [showBlurHash, setShowBlurHash] = useState(!!blurHash?.data);

  useEffect(() => {
    if (!imgRef.current) return;

    const onLoad = () => {
      setLoaded(true);
      setTimeout(() => setShowBlurHash(false), 1000);
    };

    if (imgRef.current?.complete) {
      onLoad();
      return;
    }

    imgRef.current.addEventListener("load", onLoad);
    return () => {
      imgRef.current?.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showBlurHash && blurHash ? (
        <Blurhash className="size-full absolute inset-0" {...blurHash} />
      ) : null}

      <img
        ref={imgRef}
        loading="lazy"
        className={cn(
          "size-full absolute inset-0 z-[1] transition-[opacity,filter] duration-700",
          !isLoaded && "opacity-0 blur-sm",
          imgClassName
        )}
        {...props}
      />
    </div>
  );
};

export default Image;
