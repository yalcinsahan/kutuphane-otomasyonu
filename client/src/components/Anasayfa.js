import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../AppContext';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Anasayfa = () => {


    const { kitaplar } = useContext(AppContext);

    const [detayId, setDetayId] = useState("");
    const [aramaTerimi, setAramaTerimi] = React.useState("");
    const [kitapListesi, setKitapListesi] = React.useState([]);
    const [buttonType, setButtonType] = useState("btn btn-outline-dark")
    const [kategoriler, setKategoriler] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/kategoriler").then((result) => {
            setKategoriler(result.data)
        });
    }, []);

    const detayliBilgi = (id) => {
        setDetayId(id)
    }

    const handleChange = event => {
        setAramaTerimi(event.target.value);
    };

    React.useEffect(() => {
        if (!aramaTerimi) {
            setKitapListesi([...kitaplar])
        } else {
            const results = kitaplar.filter(kitap =>
                kitap.ad.toLowerCase().includes(aramaTerimi)
            );
            setKitapListesi(results);
        }
    }, [aramaTerimi, kitaplar]);

    const handleKategori = (kategori) => {
        console.log(kategori);
        const results = kitaplar.filter(kitap =>
            kitap.kategori.toLowerCase().includes(kategori.toLowerCase())
        );
        setKitapListesi(results);
    }

    if (detayId) return <Redirect to={"/" + detayId}></Redirect>

    return (
        <div className="container my-5 col-7">

            <h2 className="text-center">Kütüphanedeki Kitaplar</h2>


            <div className="col-12 row d-flex justify-content-center">

                <div className="col-12 mt-5">
                    <input style={{ border: "1px black solid" }}
                        className="col-12 form-control"
                        type="text"
                        placeholder="ara..."
                        value={aramaTerimi}
                        onChange={handleChange} />


                    <div className="col-12 mt-3 p-0" >
                        {kategoriler.map((kat) => <button key={kat.id} onClick={(e) => handleKategori(e.target.value)} value={kat.ad}
                            type="button" className={buttonType}>{kat.ad}</button>)}

                    </div>

                </div>



                {kitapListesi.map((kitap) => {
                    return (
                        <div key={kitap.id} className="col-6 col-md-4 rounded mt-5">
                            <div className="card-body bg-warning p-0 rounded">
                                <div className=" bg-dark card-title text-white text-center m-0 py-2 rounded-top">
                                    {kitap.ad}
                                </div>
                                <img className="align-self-center h-50 card-img-top m-0" src={`http://localhost:8080/image/${kitap.id}.jpg`} alt={kitap.ad} />
                                <button
                                    onClick={() => detayliBilgi(kitap.id)}
                                    className="bg-warning col-12 py-2 rounded-bottom">Detaylar</button>
                            </div>
                        </div>
                    )
                })}



            </div>


        </div >
    );
};

export default Anasayfa;

/*
<button onClick={(e) => handleKategori(e.target.value)} value="Çocuk Kitapları"
                            type="button" className={buttonType}>Çocuk Kitapları</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Edebiyat"
                            type="button" className={buttonType}>Edebiyat</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Eğitim"
                            type="button" className={buttonType}>Eğitim</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Felsefe"
                            type="button" className={buttonType}>Felsefe</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Psikoloji"
                            type="button" className={buttonType}>Psikoloji</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Politika"
                            type="button" className={buttonType}>Politika</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Sağlık"
                            type="button" className={buttonType}>Sağlık</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Siyaset"
                            type="button" className={buttonType}>Siyaset</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Tarih"
                            type="button" className={buttonType}>Tarih</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Felsefe"
                            type="button" className={buttonType}>Felsefe</button>
                        <button onClick={(e) => handleKategori(e.target.value)} value="Diğer..."
                            type="button" className={buttonType}>Diğer...</button>
*/