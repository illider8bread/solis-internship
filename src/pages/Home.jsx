import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";

const Home = () => {
  const [collectionsData, setCollectionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCollections() {
    setIsLoading(true);
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
         setCollectionsData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() =>{
        setIsLoading(false);
      }
      )
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollections()
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections collections={collectionsData}/>
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
