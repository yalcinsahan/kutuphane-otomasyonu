import React, { useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import AppContext from '../AppContext';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const Bilgilerim = () => {

    const { oturumdakiKisi, oturumDurumu } = useContext(AppContext)
    const [butonAd, setbutonAd] = useState("Bilgilerimi Güncelle")
    const [oturumBilgileri, setOturumBilgileri] = useState(oturumdakiKisi)
    const [kitap, setKitap] = useState({})

    useEffect(() => {
        if (oturumdakiKisi.kitap_id) {
            axios.get(`http://localhost:8080/kitaplar/kitabial/${oturumdakiKisi.kitap_id}`).then((result) => {
                setKitap(result.data)
            })
        }
    }, [oturumdakiKisi])

    if (!oturumdakiKisi.rol) return <Redirect to="/" />

    const bilgileriGuncelle = () => {
        if (butonAd === "Bilgilerimi Güncelle") {
            setbutonAd("Değişiklikleri Kaydet")
        }
        else {
            axios.put(`http://localhost:8080/kullanicilar/update/${oturumdakiKisi.id}`, oturumBilgileri)
                .then((result) => {
                    oturumDurumu(result.data)
                    setbutonAd("Bilgilerimi Güncelle")
                })
        }
    }

    const hesabiKapat = () => {
        axios.delete(`http://localhost:8080/kullanicilar/delete/${oturumdakiKisi.id}`);
        window.location.reload();
    }

    return (
        <div className="col-12 col-lg-6 container">

            <table style={{ border: "2px solid black" }} className="table table-bordered mt-5">
                <thead>
                    <tr>

                    </tr>
                </thead>
                <tbody>
                    <tr style={{ border: "2px solid black" }} >
                        <td className="col-5" style={{ border: "2px solid black" }} >
                            {oturumBilgileri.id}</td>
                    </tr>
                    <tr style={{ border: "2px solid black" }} >
                        <td style={{ border: "2px solid black" }} >
                            {butonAd === "Değişiklikleri Kaydet"
                                ? <input className="col-12" value={oturumBilgileri.ad} onChange={(e) => setOturumBilgileri({ ...oturumBilgileri, ad: e.target.value })}></input>
                                : oturumBilgileri.ad}
                        </td>
                    </tr>
                    <tr style={{ border: "2px solid black" }} >
                        <td style={{ border: "2px solid black" }} >
                            {butonAd === "Değişiklikleri Kaydet"
                                ? <input className="col-12" value={oturumBilgileri.soyad} onChange={(e) => setOturumBilgileri({ ...oturumBilgileri, soyad: e.target.value })}></input>
                                : oturumBilgileri.soyad}
                        </td>
                    </tr>
                    <tr style={{ border: "2px solid black" }} >
                        <td style={{ border: "2px solid black" }} >
                            {butonAd === "Değişiklikleri Kaydet"
                                ? <input className="col-12" value={oturumBilgileri.email} onChange={(e) => setOturumBilgileri({ ...oturumBilgileri, email: e.target.value })}></input>
                                : oturumBilgileri.email}
                        </td>
                    </tr>
                    <tr style={{ border: "2px solid black" }} >
                        <td style={{ border: "2px solid black" }} >
                            {butonAd === "Değişiklikleri Kaydet"
                                ? <input className="col-12" value={oturumBilgileri.sifre} onChange={(e) => setOturumBilgileri({ ...oturumBilgileri, sifre: e.target.value })}></input>
                                : oturumBilgileri.sifre}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="row d-flex justify-content-between">
                <button className="ml-3 btn btn-success col-5"
                    onClick={bilgileriGuncelle}
                >{butonAd}</button>
                <button onClick={hesabiKapat}
                    className="mr-3 btn btn-danger col-5">Hesabı Kapat</button>
            </div>

            <h3 className="mt-5"></h3>

            { oturumdakiKisi.kitap_id &&
                <div>
                    <h3 className="mb-3">Aldığınız Kitaplar:</h3>
                    <div className="row bg-warning p-2 mt-3">
                        <img className="col-3" src={`http://localhost:8080/image/${kitap.id}.jpg`} alt={kitap.ad} />
                        <div>
                            <h5>Kitabın İsmi: {kitap.ad}</h5>
                            <h5>Kitabın Yazarı: {kitap.yazar}</h5>
                            <h5>Kitabın Kategorisi: {kitap.kategori}</h5>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Bilgilerim;