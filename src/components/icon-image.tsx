import Image from 'next/image';
import { ComponentProps } from 'react';

type IconImgProps = {
  id: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
} & Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'width' | 'height' | 'priority' | 'className'
>;

// icons 폴더 내 png 이미지만 사용
export default function IconImg({
  id,
  alt,
  size = 24,
  className,
  priority = false,
  ...props
}: IconImgProps) {
  return (
    <Image
      src={`/icons/${id}.png`}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={priority}
      {...props}
    />
  );
}
