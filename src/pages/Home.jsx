import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = ({ itemsData, collectionsData, loadingState, sellersData }) => {
  // function to fix React Slider Arrows
  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow next"
        style={arrowStyle("right")}
      >
        <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
      </div>
    );
  }
  // function to fix React Slider Arrows
  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow prev"
        style={arrowStyle("left")}
      >
        <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
      </div>
    );
  }
  // function to fix React Slider Arrows
  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "-25px",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 40,
    height: 40,
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  // React Slider settings
  const settingsReactSlider = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
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
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections settings={settingsReactSlider} collections={collectionsData} loadingState={loadingState} />
        <NewItems settings={settingsReactSlider} items={itemsData} loadingState={loadingState} />
        <TopSellers sellers={sellersData} loadingState={loadingState}/>
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
