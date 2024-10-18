export type NewsLatest = {
  data: {
    title: string;
    posts: {
      link: string;
      title: string;
      pubDate: string;
      description: string;
      thumbnail: string;
    }[];
  };
};

export type NewsLatestAPIResponse = {
  endpoints: NewsLatest[];
};

export const getNewsLatest = async (kategori: string): Promise<NewsLatestAPIResponse> => {
  try {
    // Gunakan template literal untuk menyisipkan parameter 'kategori'
    const response = await fetch(`https://api-berita-indonesia.vercel.app/${kategori}/terbaru/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Log untuk memeriksa struktur data yang dikembalikan dari API
    console.log("API Response:", data);

    // Cek apakah data memiliki struktur 'endpoints'
    if (!data || !data.data || !Array.isArray(data.data.posts)) {
      throw new Error("Invalid API response structure");
    }

    // Bungkus dalam format yang diharapkan
    return { endpoints: [data] };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
