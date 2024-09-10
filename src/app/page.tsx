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
        <div className="divider"></div>
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
        <main className="container mx-auto py-4 px-8">
          <div className="px-8">
            <div className="hero min-h-80 rounded-md">
              <div className="hero-overlay">IKLAN</div>
            </div>
            <div
              className="hero min-h-64 rounded-md mt-10"
              style={{
                backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
              }}>
              <div className="hero-overlay"></div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-10">
              <div>
                <div
                  className="hero min-h-80 rounded-md"
                  style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                  }}>
                  <div className="hero-overlay"></div>
                </div>
              </div>
              <div>
                <div
                  className="hero min-h-80 rounded-md"
                  style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                  }}>
                  <div className="hero-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
