"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/projects/placeholder.svg";

type SafeImageProps = React.ComponentProps<typeof Image>;

export function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const [value, setValue] = useState(src || FALLBACK_IMAGE);

  return (
    <Image
      {...props}
      src={value}
      alt={alt}
      onError={() => setValue(FALLBACK_IMAGE)}
    />
  );
}
