import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Popover } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Loader from "react-loader-spinner";
import "./App.css";
import AuthorCard from "./components/authorCard";
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
  const [bookImprovements, setBookImprovements] = React.useState<any>({});

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
          <AuthorCard authorObj={authorObj} />
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
      {Object.keys(bookImprovements).length > 0 ? (
        <div className="App">
          <Card
            className="border-light"
            style={{
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "8px",
              marginRight: "12px",
              marginLeft: "12px",
              backgroundColor: "#1e7b85",
            }}
          >
            <Card.Body>
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
                    color: "#1e7b85",
                  }}
                  pill
                  bg="light"
                >
                  {bookImprovements.author_improvements_count}
                </Badge>
              </OverlayTrigger>
              <Card.Text style={{ padding: "0px", color: "#fff" }}>
                {bookImprovements.scribd_book_title}
              </Card.Text>
            </Card.Body>
          </Card>

          <div
            style={{
              marginLeft: "0px",
              height: "500px",
              overflowY: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            {authorCards}
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#f5f7fc",
            height: "600px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", top: "50%" }}>
            <Loader
              type="ThreeDots"
              color="#1e7b85"
              height={50}
              width={50}
              timeout={8000}
            />
          </div>
        </div>
      )}
    </div>
  );
}
