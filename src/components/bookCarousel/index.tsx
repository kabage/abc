import Book, { BookType } from "../book";
import { Card } from "react-bootstrap";

export type BookCarouselProps = {
  books: BookType[];
  authorName: string;
};

export default function BookCarousel({ books, authorName }: BookCarouselProps) {
  return (
    <div>
      <Card.Text>Read more from {authorName}</Card.Text>
      {books && (
        <div style={{ display: "flex", overflow: "auto" }}>
          {books.map((book) => (
            <Book bookObj={book} />
          ))}
        </div>
      )}
    </div>
  );
}
