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
    const [isLoading, setIsLoading] = useState(false);

   async function fetchCollections() {
      setIsLoading(true);
      const fetchHotCollections = axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      const fetchNewItems = axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");

      axios.all([fetchHotCollections, fetchNewItems])
        .then(axios.spread((fetchedHotCollections, fetchedNewItems) => {
           setCollectionsData(fetchedHotCollections.data)
           setItemsData(fetchedNewItems.data)
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
    fetchCollections()
  }, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home itemsData={itemsData} collectionsData={collectionsData} loadingState={isLoading}/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
