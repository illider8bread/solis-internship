import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const HotCollections = (collections) => {
  let collectionsData = collections.collections
  let sliderRef= useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings:{
          slidesToShow: 1
        }
      }
    ]
  }


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

          <Slider ref={slider => {sliderRef=slider}} {...settings}>
          {collectionsData.map(({id, title, authorImage, nftImage, nftId, authorId, code}) => (
              <div className="nft_coll" key={id}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
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
              </div>
          ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
