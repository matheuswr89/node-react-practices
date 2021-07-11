import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import numeral from 'numeral';

export default function Main() {
    const [country, setCountry] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [borders, setBorders] = useState([]);

    useEffect(() => {
        let query = window.location.search;
        let params = new URLSearchParams(query);
        const pais = params.get('country');
        async function recupera() {
            const response = await api.get(`/alpha/${pais}`)
            setCountry(response.data);
            setCurrencies(response.data.currencies)
            setLanguages(response.data.languages)
            setBorders(response.data.borders)
        }
        recupera();
    }, []);

    function refreshPage() {
        window.location.reload();
    }
    return (
        < div className="about-container" >
            <Link className="back-link" to="/"><KeyboardBackspaceIcon /> Back</Link>
            <div className="about-section">
                <div className="about-img">
                    <img src={country.flag} alt={country.name} />
                </div>

                <div key={country.name}>
                    <div className="group">
                        <div className="about-div">
                            <h1>{country.name}</h1>
                            <p><span>Native Name: </span>{country.nativeName}</p>
                            <p><span>Population: </span>{numeral(country.population).format(0.000)}</p>
                            <p><span>Region: </span>{country.region}</p>
                            <p><span>Sub Region: </span>{country.subregion}</p>
                            <p><span>Capital: </span>{country.capital}</p>
                        </div>
                        <div className="about-div2">
                            <p><span>Top Level Domain: </span>{country.topLevelDomain}</p>
                            <p><span>Currencies: </span>{currencies.map(item => item.name + ',')}</p>
                            <p><span>Languages: </span>{languages.map(item => item.name + ',')}</p>
                        </div>
                    </div>

                    <div className="border-section">
                        <span className="span-border">{Object.keys(borders).length > 0 ? "Border Countries: " : ""}</span>
                        <span className="span-link">{borders ? borders.map(code =>
                            (<button className="button-countries" key={code} onClick={refreshPage}>
                                <Link className="link-countries" to={`/about?country=${code}`}>{code}</Link>
                            </button>)
                        ) : ""}</span>
                    </div>
                </div>
            </div>
        </div >
    );
}