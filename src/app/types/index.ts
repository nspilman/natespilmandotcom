export type Music = {
  html: string;
  id: string;
  frontmatter: {
    date: string;
    description: string;
    favorite: boolean;
    title: string;
    published: boolean;
  };
};

export type Blog = {
  html: string;
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    description: string;
    favorite: boolean;
    published: boolean;
    title: string;
    tags: string[];
  };
};
