import React from "react";
import "./App.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { ChevronRight } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import BookList from "./BookListing/BookList";
function setAuthorDefaults(authorImprovements: Array<any>) {
  if (!authorImprovements) return null;
  for (let authorImprovement of authorImprovements) {
    const improvements = [
      "author_name_improvement",
      "author_description_improvement",
      "author_book_listing_improvement",
      "author_image_improvement",
      "authors_missing_improvement",
    ];
    for (let improvement of improvements) {
      if (!Object.keys(authorImprovement).includes(improvement)) {
        authorImprovement[improvement] = false;
      }
    }
  }
  return authorImprovements;
}
function getAuthorNameSlug(authorName: string) {
  let tokens = authorName.split(" ");
  return `${tokens[0][0]}${tokens[1][0]}`;
}
async function getBookImprovements(setBookImprovements: any) {
  let tabs: any = [];
  try {
    tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
  } catch (err) {
    console.log(err);
  }
  let response = await axios({
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    url: `https://bookapi.eitbyt.com/book/?scribd_id=${tabs[0].url}`,
  });
  if (response.data.scribd_book_id) {
    setBookImprovements(response.data);
  } else {
    setBookImprovements({});
  }
}

export default function App() {
  const [bookImprovements, setBookImprovements] = React.useState<any>();
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const imageEndPoint = "https://bookapi.eitbyt.com/images?";
  React.useEffect(() => {
    getBookImprovements(setBookImprovements);
  }, []);

  if (!bookImprovements) {
    return null;
  }
  let bookData: any = setAuthorDefaults(
    bookImprovements["author_improvements"]
  );
  let authorCards;
  if (bookData) {
    authorCards = bookData.map((authorObj: any) => {
      return (
        <div>
          <Card style={{ marginLeft: "12px", marginBottom: "8px" }}>
            <Card.Body>
              <div className="profile-header-img float-left">
                {authorObj.author_image_improvement ||
                (authorObj.authors_missing_improvement &&
                  authorObj.author_image) ? (
                  <img
                    className="img-circle rounded-circle float-left"
                    src={imageEndPoint + authorObj.author_image}
                    alt={"NA"}
                  />
                ) : (
                  <div className="altProfileImage profileInitials">
                    <span>{getAuthorNameSlug(authorObj.author_name)}</span>
                  </div>
                )}
                <Card.Text
                  style={{
                    fontFamily: "Source Sans Pro,serif",
                    maxHeight: "81px",
                    color: "#1e7b85",
                  }}
                >
                  {authorObj.author_name}
                </Card.Text>
              </div>
              {authorObj.author_description_improvement ||
              (authorObj.authors_missing_improvement &&
                authorObj.author_description) ? (
                <div>
                  <hr />
                  <Button
                    style={{
                      height: "30px",
                      width: "30px",
                      textAlign: "center",
                      marginBottom: "4px",
                    }}
                    className="rounded-circle btn-light border-0 shadow-none"
                    onClick={() => setExpanded(!expanded)}
                    aria-controls={authorObj.author_name}
                    aria-expanded={expanded}
                  >
                    <ChevronRight />
                  </Button>
                  <Collapse in={expanded}>
                    <Card.Text
                      id={authorObj.author_name}
                      style={{ fontSize: "small" }}
                    >
                      {authorObj.author_description}
                    </Card.Text>
                  </Collapse>
                </div>
              ) : null}
              {authorObj.author_book_listing_improvement ? (
                <BookList
                  listingObj={authorObj.author_book_listing}
                  authorName={authorObj.author_name}
                ></BookList>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      );
    });
  }
  return (
    <div>
      {bookImprovements ? (
        <div className="App">
          <div
            style={{
              paddingTop: "4px",
              border: "4px",
              marginLeft: "8px",
              marginTop: "8px",
              marginBottom: "12px",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {bookImprovements.scribd_book_title}
            <Badge
              style={{ float: "right", marginTop: "3px" }}
              pill
              bg="success"
            >
              {bookImprovements.author_improvements_count}
            </Badge>
          </div>
          <div
            style={{
              marginLeft: "0px",
              height: "550px",
              overflowY: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            {authorCards}
          </div>
        </div>
      ) : (
        <div>No improvements</div>
      )}
    </div>
  );
}
