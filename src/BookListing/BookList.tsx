import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
class BookList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.chunkList = this.chunkList.bind(this);
  }
  chunkList(list: any, chunk: any) {
    let chunked = [];
    let i, j, temporary;
    for (i = 0, j = list.length; i < j; i += chunk) {
      temporary = list.slice(i, i + chunk);
      chunked.push(temporary);
    }
    return chunked;
  }
  render() {
    const { listingObj, authorName } = this.props;
    const imageEndPoint = "https://bookapi.eitbyt.com/images?";
    let bookItemsCarousel = [];
    for (let bookObjList of this.chunkList(listingObj, 3)) {
      let bookRow = bookObjList.map((bookObj: any) => {
        return (
          <a className="col" href={bookObj.scribdLink}>
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
      });
      bookItemsCarousel.push(
        <Carousel.Item>
          <div className="container-fluid">
            <div className="d-flex flex-row flex-nowrap overflow-auto">
              {bookRow}
            </div>
          </div>
        </Carousel.Item>
      );
    }
    return (
      <div>
        <hr />
        <Card.Text>Read More From {authorName}</Card.Text>
        <Carousel
          interval={null}
          indicators={false}
          wrap={false}
          variant="dark"
          nextIcon={
            <span
              aria-hidden="true"
              className="carousel-control-next-icon"
              style={{ height: "20px" }}
            />
          }
          prevIcon={
            <span
              aria-hidden="true"
              className="carousel-control-prev-icon"
              style={{ height: "20px" }}
            />
          }
        >
          {bookItemsCarousel}
        </Carousel>
      </div>
    );
  }
}
export default BookList;
