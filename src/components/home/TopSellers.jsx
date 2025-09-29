import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = ({ sellers, loadingState }) => {
  const sellersData = sellers;
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loadingState ?
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="skeleton-box"
                        style={{ width: "50px", height: "50px" }}>
                      </div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}>
                      </div>
                      <br />
                      <div className="skeleton-box"
                        style={{ width: "60px", height: "20px" }}>
                      </div>
                    </div>
                  </li>
                ))
                :
                sellersData.map(({ id, authorImage, authorName, authorId, price }) => (
                  <li key={id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${authorId}`}>{authorName}</Link>
                      <span>{price} ETH</span>
                    </div>
                  </li>
                ))
              }

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;