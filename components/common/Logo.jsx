import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = "default" }) {
  const sizes = {
    small: { width: 120, height: 36 },
    default: { width: 160, height: 48 },
    large: { width: 200, height: 60 },
  };

  const { width, height } = sizes[size] || sizes.default;

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src="/logo.png"
        alt="TriByte Solutions"
        width={width}
        height={height}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </Link>
  );
}