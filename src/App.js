import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handleClickNext = () => {
    if (page === data.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  const handleClickPrev = () => {
    if (page === 0) {
      setPage(data.length - 1);
    } else {
      setPage(page - 1);
    }
  };
  const handlePageChange = (index) => {
    setPage(index);
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "Loading..." : "Pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {loading ? null : (
          <div className="btn-container">
            <button className="prev-btn" onClick={() => handleClickPrev()}>
              Prev
            </button>
            {data.map((item, index) => {
              return (
                <>
                  <button
                    key={index}
                    className={
                      page === index ? "active-btn page-btn" : "page-btn"
                    }
                    onClick={() => handlePageChange(index)}>
                    {index + 1}
                  </button>
                </>
              );
            })}
            <button className="next-btn" onClick={() => handleClickNext()}>
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
