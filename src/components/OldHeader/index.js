import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../images/logo1.png';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';
import Face2Icon from '@mui/icons-material/Face2';
import { Container } from '@mui/material';

export default function Header(props) {
    const [navList, setNavList] = useState([]);
    const [socialList, setSocialList] = useState([]);

    const getNavList = () => {
        fetch('/data/navigation_en.json')
            .then(res => res.json())
            .then(resp => {
                setNavList(resp)
            })
    }
    const getSocialList = () => {
        fetch('./data/social.json')
            .then(res => res.json())
            .then(resp => {
                setSocialList(resp);
            })
    }
    useEffect(()=> {
        getNavList();
        getSocialList();
    }, []);

    const navListRender = navList.map((item, index) => {
        const url = item.id ? item.url+'/'+item.id : item.url;
        return <li className="nav-item" key={index}><NavLink to={url}className="nav_link"><span className="link-subtitle">{item.title}</span></NavLink>
        </li>
    })

    const socialListRender = socialList.map((item, index) => {
        let IconComponent;
        switch (item.id) {
            case 'facebook':
                IconComponent = FacebookOutlinedIcon;
                break;
            case 'linkedin':
                IconComponent = LinkedInIcon;
                break;
            case 'instagram':
                IconComponent = InstagramIcon;
                break;
            default:
                IconComponent = FacebookOutlinedIcon;
                break;
          }
        
        return <li key={index} className="social-link-item">
            <a href={item.url} className="social-link" alt={item.id}><IconComponent sx={{ fontSize: 30 }} md={{ fontSize: 34 }} lg={{ fontSize: 40 }} color="primary"/></a>
        </li>
        }
    )

    return (
        <header className="header">
            <Container>
                <nav className="main_nav">
                    <div className="logo-wrapper">
                        <a href="/" className="logo_link">
                            <img src={logo} alt="logo" className="logo" />
                        </a>
                    </div>
                    <div className="login-wrapper">
                        <div id="login-statusbar" className="login-statusbar active">
                            <a id="login-link" className="login-link" href="/" >
                                <PersonIcon fontSize= "large" className="login-img"/>
                                <span id="login-username" className="login-username">Sign in</span>
                            </a>
                        </div>
                        <div id="account-statusbar" className="account-statusbar">
                            <a id="account-link" className="account-link" href="/" >
                                <Face2Icon fontSize= "large" className="account-img"/>
                                <span id="account-username" className="account-username">Name</span>
                            </a>
                        </div>
                    </div>

                    <div className="nav-list_wrapper">
                        <ul className="nav_list">
                            {navListRender}
                        </ul>   
                    </div>
                    <div className="social-links-wrapper">
                        <ul className="social-link-list">
                            {socialListRender}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    )
}