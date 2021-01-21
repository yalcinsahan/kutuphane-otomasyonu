import React, { useState } from 'react';
import Navbar from './components/Navbar.js'
import AppContext from './AppContext.js'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development';

const App = () => {

    const [kitaplar, setKitaplar] = useState([]);
    const [oturumdakiKisi, setOturumdakiKisi] = useState(JSON.parse(localStorage.getItem('oturum')) || {});

    const oturumDurumu = (gelenKisi) => {
        setOturumdakiKisi(gelenKisi)
        localStorage.setItem('oturum', JSON.stringify(gelenKisi));
    }

    const kitapListesi = () => {
        axios.get("http://localhost:8080/kitaplar").then((result) => {
            setKitaplar(result.data)
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8080/kitaplar").then((result) => {
            setKitaplar(result.data)
        })
    }, [])

    const tekBirKitap = (id) => {
        let deger = {};
        kitaplar.map((kitap) => kitap.id === id ? deger = kitap : {});
        return deger;
    }

    return (
        <AppContext.Provider value={{ kitapListesi, oturumdakiKisi, kitaplar, tekBirKitap, oturumDurumu }}>
            <div>
                <Navbar />
            </div>
        </AppContext.Provider>
    );
};

export default App;