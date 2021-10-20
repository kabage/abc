import { ComponentStory } from "@storybook/react";
import AuthorCard, { AuthorCardPropType } from ".";
import "bootstrap/dist/css/bootstrap.css";

const DEFAULT_PROPS: AuthorCardPropType = {
  idx: 2,
  authorObj: {
    scribd_author_id: "35d18c06-5525-4a72-9cb7-fbd9ac32d5c3",
    authors_missing_improvement: true,
    author_name: "Yakham Diop",
    author_image: null,
    author_description:
      "Yakham Diop titulaire d’un doctorat unique de Géographie de l’Université Paris X-Nanterre en 1996, a été Ambassadeur du Sénégal en République de Guinée-Conakry. Il est Enseignant-chercheur au Département de Géographie de l’Université Cheikh Anta Diop de Dakar et responsable du Master « Aménagement et Gestion Urbaine en Afrique » [AGUA]. Spécialiste de la géographie urbaine, économique et régionale, il participe à l’encadrement de nombreux étudiants en Master.",
    author_name_improvement: false,
    author_description_improvement: false,
    author_book_listing_improvement: false,
    author_image_improvement: false,
  },
};

export default {
  title: "Components/Author Card",
  component: AuthorCard,
  args: DEFAULT_PROPS,
};

const Template: ComponentStory<typeof AuthorCard> = (
  args: AuthorCardPropType
) => <AuthorCard {...args} />;

export const DefaultAuthorCard = Template.bind({});

export const AuthorCardWithImage = Template.bind({});
AuthorCardWithImage.args = {
  idx: 0,
  authorObj: {
    scribd_author_id: 233793758,
    authors_missing_improvement: true,
    author_name: "Sam Moyo",
    author_image:
      "image_hash=3a822d494eea61db89a1b2adb9d717ab&image_field=author_image",
    author_description:
      "The late Sam Moyo is Executive Director of the African Institute for Agrarian Studies (AIAS), Harare, and former President of the Council for the Development of Social Research in Africa (CODESRIA, 2009–11). He was a research professor at the Zimbabwe Institute of Development Studies, and taught at the University of Zimbabwe, and has served on the boards of various research institutes and non-governmental organizations. He is currently Editor of Agrarian South: Journal of Political Economy (Sage India). He has published widely in academic journals and is the author and editor of several books, including: The land question in Zimbabwe (SAPES, 1995), Land reform under structural adjustment in Zimbabwe (Nordiska Afrikainstitutet, 2000), Reclaiming the Land (Zed Books, 2005), African land questions, agrarian transitions and the state (Codesria 2008); Land and sustainable development in Africa (Zed Books, 2008), Reclaiming the Nation (Pluto Press, 2011), and The Agrarian Question in the Neoliberal Era (Pambazuka, 2011).",
    author_name_improvement: false,
    author_description_improvement: false,
    author_book_listing_improvement: false,
    author_image_improvement: false,
  },
};

export const AuthorCardWithBooks = Template.bind({});
AuthorCardWithBooks.args = {
  authorObj: {
    scribd_author_id: 337920074,
    author_description:
      "Kathryn Toure, PhD in education, is a researcher and writer. She promotes the circulation of African worldviews and facilitates community inquiry to deepen understandings of her/history and culture.",
    author_description_improvement: true,
    author_name: "Kathryn    Toure",
    author_image: null,
    author_book_listing_improvement: true,
    author_book_listing: [
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
    author_name_improvement: false,
    author_image_improvement: false,
    authors_missing_improvement: false,
  },
};
