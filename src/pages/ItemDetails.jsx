import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AOS from 'aos'
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const params = useParams();
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchItem() {
    setIsLoading(true);
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${params.itemId}`)
      .then(function (response) {
        setItemData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchItem();
    window.scrollTo(0, 0);
  }, [])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {isLoading ?
              (<div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton-box"
                    style={{ width: "100%", height: "500px", borderRadius: "5px" }}>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton-box"
                      style={{ width: "300px", height: "50px", borderRadius: "5px" }}>
                    </div>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>

                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>

                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, perferendis nam earum rerum vel corrupti repellat molestiae quo! Minima praesentium aperiam, distinctio nam voluptates numquam. Rerum dignissimos maxime eaque dolore?
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">

                            <div className="skeleton-box"
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                            </div>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-box"
                              style={{ width: "100px", height: "20px", borderRadius: "5px" }}>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="skeleton-box"
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                            </div>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-box"
                              style={{ width: "100px", height: "20px", borderRadius: "5px" }}>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
              :
              (<div className="row">
                <div className="col-md-6 text-center" data-aos="fade"
            data-aos-duration="3000">
                  <img
                    src={itemData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info" data-aos="fade-left"
            data-aos-duration="2000">
                    <h2>{itemData.title} #{itemData.tag}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemData.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemData.likes}
                      </div>
                    </div>
                    <p>
                      {itemData.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemData.ownerId}`}>
                              <img className="lazy" src={itemData.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemData.ownerId}`}>{itemData.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemData.creatorId}`}>
                              <img className="lazy" src={itemData.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemData.creatorId}`}>{itemData.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemData.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
