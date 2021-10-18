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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Popover } from "react-bootstrap";
import CSSTransition from "react-transition-group/CSSTransition";
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
  return `${tokens[0][0]}${tokens[1][0] || ""}`;
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
function getDescriptionTextColor(authorObj: any) {
  if (
    authorObj.author_description_improvement ||
    authorObj.authors_missing_improvement
  ) {
    return "";
  } else {
    return "text-muted";
  }
}
export default function App() {
  const [bookImprovements, setBookImprovements] = React.useState<any>();
  const [expanded, setExpanded] = React.useState<any>({});
  const [inProp, setInProp] = React.useState(false);

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
    authorCards = bookData.map((authorObj: any, idx: number) => {
      return (
        <div>
          <Card
            style={{
              marginLeft: "12px",
              marginRight: "12px",
              marginBottom: "8px",
            }}
          >
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
              {authorObj.author_description ? (
                <div>
                  <hr />

                  <CSSTransition
                    in={inProp}
                    timeout={300}
                    classNames="read-more"
                  >
                    <div>{}</div>
                  </CSSTransition>

                  {authorObj.author_description.length > 300 ? (
                    <Button
                      style={{
                        height: "30px",
                        width: "30px",
                        textAlign: "center",
                        marginBottom: "4px",
                      }}
                      className="rounded-circle btn-light border-0 shadow-none"
                      onClick={() => {
                        setExpanded((expanded: any) => ({
                          ...expanded,
                          [authorObj.author_name]:
                            !expanded[authorObj.author_name],
                        }));
                        setInProp(!inProp);
                      }}
                      aria-controls={authorObj.author_name}
                      aria-expanded={expanded[authorObj.author_name]}
                    >
                      <ChevronRight
                        className="read-more"
                        id={authorObj.author_name}
                        style={{ transform: "rotate(90deg)" }}
                      />
                    </Button>
                  ) : null}
                  <Collapse in={expanded[authorObj.author_name]}>
                    <Card.Text
                      id={authorObj.author_name}
                      className={getDescriptionTextColor(authorObj)}
                      style={{ fontSize: "small" }}
                    >
                      {authorObj.author_description}
                    </Card.Text>
                  </Collapse>
                  {!expanded[authorObj.author_name] ? (
                    <Card.Text
                      id={authorObj.author_name}
                      className={getDescriptionTextColor(authorObj)}
                      style={{ fontSize: "small" }}
                    >
                      {authorObj.author_description.length > 300 ? (
                        <div>
                          {authorObj.author_description.substring(0, 300) +
                            "..."}
                        </div>
                      ) : (
                        <div>{authorObj.author_description}</div>
                      )}
                    </Card.Text>
                  ) : null}
                </div>
              ) : null}
              {authorObj.author_book_listing_improvement ? (
                <BookList
                  listingObj={authorObj.author_book_listing}
                  authorName={authorObj.author_name}
                ></BookList>
              ) : null}
            </Card.Body>
            <div
              style={{
                fontSize: "small",
                textAlign: "center",
                paddingBottom: "4px",
              }}
            >
              {idx + 1}
            </div>
          </Card>
        </div>
      );
    });
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        We have found{" "}
        <strong>{bookImprovements.author_improvements_count}</strong>{" "}
        improvement(s) to this book's data.
      </Popover.Body>
    </Popover>
  );
  return (
    <div>
      {bookImprovements ? (
        <div className="App">
          <div
            className="shadow-sm p-2 mb-1 bg-white "
            style={{
              paddingTop: "4px",
              paddingBottom: "8px",
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "4px",
              marginRight: "12px",
              marginLeft: "12px",
            }}
          >
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popover}
            >
              <Badge
                style={{
                  float: "right",
                  marginTop: "3px",

                  marginLeft: "8px",
                }}
                pill
                bg="success"
              >
                {bookImprovements.author_improvements_count}
              </Badge>
            </OverlayTrigger>

            {bookImprovements.scribd_book_title}
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
