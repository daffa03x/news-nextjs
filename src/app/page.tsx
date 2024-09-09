"use client";
import { useEffect, useState } from "react";
import { getNews, News } from "./services/news";
import Link from "next/link";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  useEffect(() => {
    getNews()
      .then((data) => setNews(data.endpoints))
      .catch((err) => setError(err.message));
  }, []);

  const toggleCategory = (categoryName: string) => {
    if (openCategory === categoryName) {
      setOpenCategory(null); // Close dropdown if the same category is clicked
    } else {
      setOpenCategory(categoryName); // Open the selected category
    }
  };

  if (error) {
    return <div>Error loading news: {error}</div>;
  }

  return (
    <>
      <header className="bg-black">
        <div className="container mx-auto flex justify-between align-center pt-5 px-7">
          <Link className="text-2xl text-white" href="/">
            Berita Indonesia
          </Link>
          <input type="text" className="rounded-md bg-slate-100 w-1/4 h-9" placeholder="   Cari tokoh, topik atau peristiwa" />
        </div>
        <hr className="mt-8 border-zinc-900" />
        <div className="container mx-auto flex flex-wrap space-x-4 justify-center align-center mt-8 pb-8">
          {news.map((category) => (
            <div key={category.name} className="relative">
              {/* Dropdown Trigger */}
              <button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none" onClick={() => toggleCategory(category.name)}>
                {category.name}
              </button>

              {/* Horizontal Dropdown Menu */}
              {openCategory === category.name && (
                <div className="absolute left-0 mt-2 w-auto rounded-md shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5">
                  <div className="flex space-x-4 p-4" role="menu" aria-orientation="horizontal">
                    {category.paths.map((path) => (
                      <Link key={path.name} href={path.path} className="block shadow-lg rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                        {path.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </header>
      <section className="bg-zinc-950">
        <main className="container mx-auto p-4">
          <p className="text-white">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </main>
      </section>
    </>
  );
}
