import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';

export default function Main() {
    const [countries, setCountries] = useState([]);
    const [nome, setNome] = useState('');
    const history = useHistory();
    const [region, setRegion] = useState('');

    const handleChange = async (event) => {
        setRegion(event.target.value);
        if (event.target.value !== '') {
            await api.get(`/region/${event.target.value}`).then(response => {
                setCountries(response.data);
            })
        } else {
            await api.get('/all').then(response => {
                setCountries(response.data);
            });
        }
    };

    useEffect(() => {
        api.get('/all').then(response => {
            setCountries(response.data);
        })
    }, []);

    function handleAbout() {
        if (nome) {
            const tem = countries.find(item => item.name.toLowerCase().includes(nome.toLowerCase()) ? item : null);
            (tem) ? history.push(`/about?country=${tem.alpha3Code}`)
                : alert("Don't have a country with the name '" + nome + "'")
        }
    }

    return (
        <div className="paises-container">
            <header>
                <Paper component="form" className="root" onSubmit={handleAbout}>
                    <IconButton type="submit" className="iconButton" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        className="input-text"
                        placeholder="Search for a country"
                        inputProps={{ 'aria-label': 'search for a country' }}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                </Paper>
                <FormControl variant="outlined" className="formControl">
                    <InputLabel className="input-label"id="demo-simple-select-outlined-label">Filter by region</InputLabel>
                    <Select
                        className="select-item"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={region}
                        onChange={handleChange}
                        label="Filter by region"
                    >
                        <MenuItem className="select-item" value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem className="select-item" value={'africa'}>Africa</MenuItem>
                        <MenuItem className="select-item" value={'americas'}>Americas</MenuItem>
                        <MenuItem className="select-item" value={'asia'}>Asia</MenuItem>
                        <MenuItem className="select-item" value={'europe'}>Europe</MenuItem>
                        <MenuItem className="select-item" value={'oceania'}>Oceania</MenuItem>
                    </Select>
                </FormControl>
            </header>
            <ul>
                {countries.map(paises => (
                    <li key={paises.numericCode}>
                        <Link to={`/about?country=${paises.alpha3Code}`}>
                            <div>
                                <img src={paises.flag} alt={paises.name} />
                                <div>
                                    <h3><b>{paises.name}</b></h3>
                                    <p><b>Population:</b> {paises.population.toLocaleString('pt-BR').replace(',', '.')}</p>
                                    <p><b>Region:</b> {paises.region}</p>
                                    <p><b>Capital:</b> {paises.capital}</p>
                                    <p />
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}