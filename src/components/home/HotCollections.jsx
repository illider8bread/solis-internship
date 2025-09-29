import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const HotCollections = ({ collections, loadingState, settings }) => {
  let collectionsData = collections;
  let sliderRef = useRef(null);


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider ref={slider => { sliderRef = slider }} {...settings}>
            {loadingState ? (
              new Array(4).fill(0).map((_, index) => (
                <div className="px-1" key={index}>
                  <div className="nft_wrap">
                    <div className="skeleton-box"
                      style={{ width: "100%", height: "200px" }}>
                    </div>
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skeleton-box"
                      style={{ width: "50px", height: "50px" }}>
                    </div>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton-box"
                      style={{ width: "100px", height: "20px" }}>
                    </div>
                    <br />
                    <div className="skeleton-box"
                      style={{ width: "60px", height: "20px" }}>
                    </div>
                  </div>
                </div>
              ))) : (
              collectionsData.map(({ id, title, authorImage, nftImage, nftId, authorId, code }) => (
                <div className="nft_coll" key={id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy pp-coll" src={authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{title}</h4>
                    </Link>
                    <span>ERC-{code}</span>
                  </div>
                </div>)
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
