import Image from 'next/image';

type IconImgProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export default function IconImg({
  src,
  alt,
  size = 24,
  className,
}: IconImgProps) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      className={className}
      alt={alt}
    />
  );
}
