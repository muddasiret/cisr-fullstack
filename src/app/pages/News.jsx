import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInterceptor";
import NewsCard from "../components/NewsCard";

const News = () => {
  const [news, setNews] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("/api/news")
      .then((response) => {
        console.log(response.data);
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div>
      <div className="grid gap-4 space-x-4 m-5">
        <h1 className=" text-2xl">News</h1>
        <div className="my-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {news
              ? news.length !== 0
                ? news.map((item) => {
                    return <NewsCard newsDetails={item} />;
                  })
                : "No news"
              : "Loading news"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
