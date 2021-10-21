import { ComponentStory } from "@storybook/react";
import Book, { BookProps } from ".";
import "bootstrap/dist/css/bootstrap.css";

const DEFAULT_PROPS: BookProps = {
  bookObj: {
    scribdLink: "https://www.scribd.com/book/464094469/",
    bookCover:
      "image_hash=f70f46acd8cf9c325ebabbb6782b1b36&image_field=cover_image_thumbnail",
    scribdBookTitle:
      "Usages et appropriation des technologies �ducatives en Afrique: quelques pistes de r�flexion",
  },
};

export default {
  title: "Components/Book",
  component: Book,
  args: DEFAULT_PROPS,
};

const Template: ComponentStory<typeof Book> = (args: BookProps) => (
  <Book {...args} />
);

export const DefaultBook = Template.bind({});
