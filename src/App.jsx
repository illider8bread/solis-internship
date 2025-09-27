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
    fetchCollections()
  }, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home collectionsData={collectionsData} loadingState={isLoading}/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
