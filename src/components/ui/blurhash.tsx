import { decode } from "blurhash";
import { useEffect, useRef, type ComponentProps } from "react";

function render(
  canvas: HTMLCanvasElement,
  blurhash: string,
  width: number = 32,
  height: number = 32
) {
  if (!blurhash) {
    return;
  }

  const pixels = decode(blurhash, width, height);
  if (!pixels) {
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx?.clearRect(0, 0, width, height);

  const imageData = new ImageData(pixels, width, height);
  ctx?.putImageData(imageData, 0, 0);
}

type BlurhashProps = ComponentProps<"canvas"> & {
  data: string;
  width?: number;
  height?: number;
};

const Blurhash = ({
  data,
  width = 32,
  height = 32,
  ...props
}: BlurhashProps) => {
  const ref = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    render(ref.current, data, width, height);
  }, [data]);

  return <canvas ref={ref} width={width} height={height} {...props} />;
};

export default Blurhash;
