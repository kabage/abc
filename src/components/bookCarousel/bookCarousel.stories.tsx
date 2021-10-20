import BookCarousel, { BookCarouselProps } from ".";
import { ComponentStory } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.css";

const DEFAULT_PROPS: BookCarouselProps = {
  authorName: "John Doe",
  books: [
    {
      scribdLink: "https://www.scribd.com/book/491507834/",
      bookCover:
        "image_hash=81b2c03e82baa328a3c0f89008b83fb5&image_field=cover_image_thumbnail",
      scribdBookTitle:
        "Covid Stories from East Africa and Beyond: Lived Experiences and Forward-Looking Reflections",
    },
    {
      scribdLink: "https://www.scribd.com/book/464094469/",
      bookCover:
        "image_hash=f70f46acd8cf9c325ebabbb6782b1b36&image_field=cover_image_thumbnail",
      scribdBookTitle:
        "Usages et appropriation des technologies �ducatives en Afrique: quelques pistes de r�flexion",
    },
    {
      scribdLink: "https://www.scribd.com/book/321994909/",
      bookCover:
        "image_hash=53afd3533582ec96dbe3949e04bd035e&image_field=cover_image_thumbnail",
      scribdBookTitle:
        "Pedagogical Appropriation of Information and Communication Technologies (ICT) by West African Educators",
    },
    {
      scribdLink: "https://www.scribd.com/book/245136690/",
      bookCover:
        "image_hash=535bcf82322d697386adb69b79ef9f9c&image_field=cover_image_thumbnail",
      scribdBookTitle: "ICT and Changing Mindsets in Education",
    },
  ],
};

export default {
  title: "Components/Book Carousel",
  component: BookCarousel,
  args: DEFAULT_PROPS,
};

const Template: ComponentStory<typeof BookCarousel> = (
  args: BookCarouselProps
) => <BookCarousel {...args} {...DEFAULT_PROPS} />;

export const DefaultBookCarousel = Template.bind({});
