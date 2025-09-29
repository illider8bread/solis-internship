import { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = ({ loadingState, author }) => {
  const params = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authorCollection, setAuthorCollection] = useState([])
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(parseInt(authorData.followers))
  
  const followingHandler= ()=>{
    setFollowing(!following);
    if(following===true){
      setFollowers(followers + 1)
    }else{
      setFollowers(parseInt(authorData.followers))
    }
  };

 async function fetchAuthor(){
  setIsLoading(true);
  axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${params.id}`)
  .then(function (response) {
    setAuthorData(response.data)
    setAuthorCollection(response.data.nftCollection)
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    setIsLoading(false);
  });
 }
 
 useEffect(()=>{
  fetchAuthor();
 },[])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">@{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{authorData.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={followingHandler}>
                        {following? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems collection={authorCollection} authorImage={authorData.authorImage} authorId={authorData.authorId} loadingState={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
