import { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosInterceptor";

function App() {
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
    <>
      <h1>CISR backend</h1>
      <h3>All news</h3>
      {news ? (
        news.length !== 0 ? (
          <div>News list</div>
        ) : (
          "No news"
        )
      ) : (
        "Loading news"
      )}
    </>
  );
}

export default App;
