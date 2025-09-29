import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({collection, authorImage, loadingState, authorId}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loadingState ? 
          new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                    <div className="skeleton-box"
                      style={{ width: "50px", height: "50px", borderRadius: "50%"}}>
                    </div>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="skeleton-box"
                      style={{ width: "100%", height: "200px" }}>
                    </div>
                </div>
                <div className="nft__item_info">
                  <div className="skeleton-box"
                      style={{ width: "100px", height: "20px", borderRadius: "5px"}}>
                    </div>
                    <br />
                    <div className="skeleton-box"
                      style={{ width: "60px", height: "20px", borderRadius: "5px", marginRight: "65%" }}>
                    </div>
                    <i className="fa fa-heart"></i>
                    <span>0</span>
                  </div>
                </div>
              </div>
          ))
          :
          collection.map(({id, likes, nftId, nftImage, price, title}) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
              <div className="nft__item" data-aos="fade">
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nftId}`}>
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nftId}`}>
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
