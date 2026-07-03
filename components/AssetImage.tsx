import Image from "next/image";

type AssetImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function AssetImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: AssetImageProps) {
  return (
    <div className={`asset-image ${className}`}>
      <Image
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
    </div>
  );
}
