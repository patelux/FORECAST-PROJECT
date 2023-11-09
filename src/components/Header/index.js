import { useState, useEffect } from "react";

const urlSocialLinks = './data/social.json';

export default function Header (){
    const [searchResults, setSearchResults] = useState([]);    
    useEffect(()=> {
        getSocialList();
    }, []);  

    const getSocialList = () => {
        fetch(urlSocialLinks)
        .then(res => res.json())
        .then(resp => {(resp) ? (setSearchResults(resp)) : (setSearchResults([]))
        })
        .catch(err => console.error(err.message))
    }
    let list;
    if(searchResults.length) {
        list = searchResults.map((item, index) => {
            return (
            <SocialLinks item={item} key={index}/>
            )
        })
    }

 return (
    <div className="header">
                <div className="container">
                    <nav className="main_nav">
                        <div className="logo-wrapper">
                            <a href="/" className="logo_link">
                                <img src="logo.svg" alt="" className="logo"/>
                            </a>
                        </div>
                        <h2 className="section-title">FORECAST SEARCH</h2>
                        <div className="social-links-wrapper">
                        <ul className="social-link-list">
                                {list}
                            </ul>
                        </div>
                    </nav>       
                </div>
            </div> 
 );
}

function SocialLinks (props) {
    const { hrefLink, ariaLabel, linkIcon } = props.item;

    return (
        <li className="social-link-item">
            <a href={hrefLink} aria-label={ariaLabel} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className={`${linkIcon} icon-social-link`}></i>
            </a>
        </li>
    )
}