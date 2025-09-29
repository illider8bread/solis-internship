import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";


function App() {
    const [collectionsData, setCollectionsData] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [sellersData, setSellersData] = useState([]);
    const [exploreData, setExploreData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [authorData, setAuthorData] = useState([])
    const [filterValue, setFilterValue] = useState('none')
    
    function filterChangeHandler(event){
      const filter = event.target.value;
      setFilterValue(filter);
    }

   async function fetchCollections() {
      setIsLoading(true);
      const fetchHotCollections = axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      const fetchNewItems = axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      const fetchTopSellers = axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
      const exploreUrl = filterValue === 'none' ? ('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore') : (`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`)
      const fetchAuthorData = axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012`);
      const fetchExplore = axios.get(exploreUrl);

      axios.all([fetchHotCollections, fetchNewItems, fetchTopSellers, fetchExplore, fetchAuthorData])
        .then(axios.spread((fetchedHotCollections, fetchedNewItems, fetchedTopSellers, fetchedExplore, fetchedAuthor) => {
           setCollectionsData(fetchedHotCollections.data);
           setItemsData(fetchedNewItems.data);
           setSellersData(fetchedTopSellers.data);
           setExploreData(fetchedExplore.data);
           setAuthorData(fetchedAuthor.data)
        }))
        .catch((error) => {
          console.log(error);
        })
        .finally(() =>{
          setIsLoading(false);
        }
        )
    }

    useEffect(() => {
    fetchCollections();
  }, [filterValue]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home sellersData={sellersData} itemsData={itemsData} collectionsData={collectionsData} loadingState={isLoading}/>} />
        <Route path="/explore" element={<Explore loadingState={isLoading} exploreData={exploreData} filterHandler={filterChangeHandler}/>} />
        <Route path="/author" element={<Author loadingState={isLoading} author={authorData} />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
