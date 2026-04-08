import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regullar" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "w-[28.95px] h-10",
  small: "w-[55px] h-[76px]",
  medium: "w-[144px] h-[199px]",
  regullar: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
  wide: "xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]",
};
const BookCover = ({
  variant = "regullar",
  className,
  coverColor = "#012b48",
  coverImage = "https://placehold.co/400x600/png?text=Book+Cover",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10 "
        style={{
          left: "12%",
          width: "87.5%",
          height: "88%",
          backgroundColor: coverColor,
        }}
      >
        <Image
          src={coverImage}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
