import React from "react";
import "./styles.css";
import ThemeSwitcher from 'react-theme-switcher';

const Header = () => (
    <div className="header">
        <p className="header__logo">Where in the World?</p>
        <button className="header__button">
            <ThemeSwitcher cssSelector="html" className="svg-icon" />
            <span className="span-header">Dark Mode</span>
        </button>
    </div>
);

export default Header;