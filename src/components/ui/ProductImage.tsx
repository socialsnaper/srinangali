'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ProductImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ProductImage({
  fallbackSrc = '/images/product-placeholder.svg',
  src,
  ...props
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
