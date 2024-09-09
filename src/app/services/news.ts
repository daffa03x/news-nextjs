// services/news.ts

export type News = {
  name: string;
  paths: {
    name: string;
    path: string;
  }[];
};

export type NewsAPIResponse = {
  endpoints: News[];
};

export const getNews = async (): Promise<NewsAPIResponse> => {
  const response = await fetch("https://api-berita-indonesia.vercel.app/");
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};
