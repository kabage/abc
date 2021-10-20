import Card from "react-bootstrap/Card";

const imageEndPoint = "https://bookapi.eitbyt.com/images?";

export type BookType = {
  scribdLink: string;
  bookCover: string;
  scribdBookTitle: string;
};

export type BookProps = {
  bookObj: BookType;
};

export default function Book({ bookObj }: BookProps) {
  return (
    <a href={bookObj.scribdLink}>
      <Card
        className="bg-transparent text-dark border bg-transparent"
        data-toggle="tooltip"
        data-placement="top"
        title={bookObj.scribdBookTitle}
        style={{
          width: "80px",
          paddingBottom: "4px",
          marginLeft: "4px",
        }}
      >
        <Card.Img
          variant="top"
          src={imageEndPoint + bookObj.bookCover}
          style={{ height: "110px", maxHeight: "15rem" }}
        />
      </Card>
    </a>
  );
}
