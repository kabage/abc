import React from "react";
import { Card, Image } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import "../../App.css";
import BookCarousel from "../bookCarousel";
import getStyles from "./AuthorCard.styles";

type AuthorType = {
  author_image_improvement: boolean;
  authors_missing_improvement: boolean;
  author_image: any | null;
  author_name: string;
  author_description: string;
  author_book_listing_improvement: boolean;
  author_book_listing: any;
  scribd_author_id: string | number;
  author_name_improvement: boolean;
  author_description_improvement: boolean;
};

export type AuthorCardPropType = {
  authorObj: Partial<AuthorType>;
};

const imageEndPoint = "https://bookapi.eitbyt.com/images?";

export default function AuthorCard({
  authorObj,
}: AuthorCardPropType): React.ReactElement {
  const [expanded, setExpanded] = React.useState(false);

  const styles = getStyles();

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

  function getAuthorNameSlug(authorName: string) {
    let tokens = authorName.split(" ");
    return `${tokens[0][0]}${tokens[1][0] || ""}`;
  }

  return (
    <Card className="border-light" style={styles.cardStyle}>
      <Card.Body>
        <div className="profile-header-img float-left">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {authorObj.author_image_improvement ||
            (authorObj.authors_missing_improvement &&
              authorObj.author_image) ? (
              <Image
                roundedCircle
                style={{ width: 80, height: 80 }}
                src={imageEndPoint + authorObj.author_image}
                alt={"NA"}
              />
            ) : (
              <div className="altProfileImage profileInitials">
                <span>{getAuthorNameSlug(authorObj.author_name || "")}</span>
              </div>
            )}
            <div style={{ marginLeft: 24 }}>
              <Card.Title>{authorObj.author_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Author</Card.Subtitle>
            </div>
          </div>
        </div>
        {authorObj.author_description ? (
          <div style={{ marginBottom: 24 }}>
            <Card.Text
              id={authorObj.author_name}
              className={getDescriptionTextColor(authorObj)}
            >
              <ShowMoreText
                /* Default options */
                lines={2}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-class"
                onClick={() => setExpanded(!expanded)}
                expanded={expanded}
                truncatedEndingComponent={"... "}
              >
                {authorObj.author_description}
              </ShowMoreText>
            </Card.Text>
          </div>
        ) : null}
        {authorObj.author_book_listing_improvement ? (
          <BookCarousel
            books={authorObj.author_book_listing}
            authorName={authorObj.author_name || ""}
          />
        ) : null}
      </Card.Body>
    </Card>
  );
}
