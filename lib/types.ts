export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imagePath: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imagePath: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};
