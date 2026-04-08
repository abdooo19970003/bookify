import { Book } from "@/types";
import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  author,
  genre,
  coverUrl,
  coverColor,
  isLoaned: isLoanded = false,
}: Book) => (
  <li className={`${isLoanded ? "xs:w-52 w-full" : ""}`}>
    <Link
      href={`/books/${id}`}
      className={cn(
        "book-card",
        isLoanded && "w-full flex flex-col items-center",
      )}
    >
      <BookCover coverImage={coverUrl} coverColor={coverColor} />
      <div className={cn("mt-4", !isLoanded && "xs:max-w-40 max-w-28")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>
      {isLoanded && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar icon"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100 "> 11 days left to return</p>
          </div>
          <Button className="book-btn">Download Receipt</Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
