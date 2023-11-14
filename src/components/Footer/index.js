// import { useEffect, useState } from 'react';
// import { NavLink } from "react-router-dom";
// import logo from '../../images/logo1.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Container } from '@mui/material';

library.add(faTwitter, faFacebookF, faInstagram);

export default function Footer (){
  // const [navList, setNavList] = useState([]);
  // const [socialList, setSocialList] = useState([]);

  // const getNavList = () => {
  //     fetch('/data/navigation_en.json')
  //         .then(res => res.json())
  //         .then(resp => {
  //             setNavList(resp)
  //         })
  // }
  // const getSocialList = () => {
  //     fetch('./data/social.json')
  //         .then(res => res.json())
  //         .then(resp => {
  //             setSocialList(resp)
  //         })
  // }
  // useEffect(()=> {
  //     getNavList();
  //     getSocialList();
  // }, []);

  // const navListRender = navList.map((item, index) => {
  //     const url = item.id ? item.url+'/'+item.id : item.url;
  //     return <li key={index}><NavLink to={url}>{item.title}</NavLink>
  //     </li>
  // })

  // const socialListRender = socialList.map((item, index) =>
  //     <li key={index} className="social-link-item">
  //         <a href={item.url} className="social-link"> <FontAwesomeIcon icon={faFacebookF} /></a>
  //     </li>
  // )
    return(
        <footer className="footer">
        <Container>
    
          {/* <div className="footer_wrapper">
            <div className="logo-wrapper">
              <a href="/" className="logo_link">
                <img src={logo} alt="logo" className="logo" />
              </a>
            </div>
            <div className="nav-list_wrapper">
              <ul className="nav_list">
                  {navListRender}
              </ul>   
            </div>

            <div className="contacts-wrapper">
              <p className="contact-title">
                contact us
              </p>
              <div className="social-links-wrapper">
                        <ul className="social-link-list">
                            {socialListRender}
                        </ul>
              </div>
              <p className="contact_tel">
                <a href="tel:+8003004040" className="contacts_link_tel">
                  800 300 4040
                </a>
              </p>
            </div>
          </div> */}
    
          <div className="copyright-box">
            <p className="footer-copyright">© 2023 Beetroot. All Rights Reserved.</p>
          </div>
          
        </Container>
      </footer>
    )
}
