import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import AppContext from '../AppContext'
import { Redirect } from 'react-router-dom';

const KitabiAl = () => {

    const [kullaniciId, setKullaniciId] = useState("");
    const [kitapId, setKitapId] = useState("");
    const [anasayfa, setAnasayfa] = useState(false)
    const { oturumdakiKisi, oturumDurumu } = useContext(AppContext)

    useEffect(() => {

    }, [])

    const handleForm = (e) => {

        axios.get(`http://localhost:8080/kullanicilar/kullaniciyial/${kullaniciId}`)
            .then((result) => {
                axios.put(`http://localhost:8080/kullanicilar/update/${kullaniciId}`, { ...result.data, kitap_id: "" }).then(() => {
                    axios.get(`http://localhost:8080/kitaplar/kitabial/${kitapId}`).then((res) => {
                        axios.put(`http://localhost:8080/kitaplar/update/${kitapId}`, { ...res.data, durumu: "KÜTÜPHANEDE MEVCUT" }).then(() => {

                            oturumDurumu({ ...oturumdakiKisi, kitap_id: "" })

                            setAnasayfa(true)

                        })

                    })
                })
            })

    }

    if (anasayfa) return <Redirect to="/" />

    return (
        <div className="container col-6 mt-5">

            <h1 className="text-center m-5">Kitabı Teslim Al</h1>

            <small>Kitap ID:</small>
            <input type="text"
                className="form-control"
                required
                value={kitapId}
                onChange={(e) => setKitapId(e.target.value)}
            />

            <h3 className="my-2"></h3>

            <small>Kullanıcı ID:</small>
            <input type="text"
                className="form-control"
                required
                value={kullaniciId}
                onChange={(e) => setKullaniciId(e.target.value)}
            />

            <div className="text-center mt-4">
                <button type="submit"
                    className="btn btn-primary w-50"
                    onClick={(e) => handleForm(e)}
                >Kitabı Al</button>
            </div>

        </div>
    );
};

export default KitabiAl;