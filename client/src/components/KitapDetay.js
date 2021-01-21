import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext';
import axios from 'axios'
import { useEffect, useState } from 'react/cjs/react.development';

const KitapDetay = () => {

    const { id } = useParams();
    const { tekBirKitap, oturumdakiKisi } = useContext(AppContext);
    const kitap = tekBirKitap(parseInt(id))
    const [yorumlar, setYorumlar] = useState([]);
    const [yorum, setYorum] = useState("")

    useEffect(() => {
        axios.get("http://localhost:8080/yorumlar").then(result => {
            setYorumlar(result.data.filter((data) => data.kitap_id == id))
        })

    }, [])

    const handleForm = (e) => {
        axios.post("http://localhost:8080/yorumlar",
            {
                kitap_id: parseInt(id),
                kullanici_yorumu: yorum,
                kullanici_adi: oturumdakiKisi.ad + " " + oturumdakiKisi.soyad
            }).then((result) => {
                window.location.reload()
            })
    }

    return (
        <div className="container col-10 col-lg-6 mt-5">
            <div className="row mb-4">
                <div className="col-6">
                    <img className="" src={`http://localhost:8080/image/${id}.jpg`} alt={kitap.ad} />
                </div>
                <div className="col-6">
                    <h2 className="text-center mb-5">{kitap.ad}</h2>
                    <h5 className="mt-3">Kitap ID: {kitap.id}</h5>
                    <h5 className="mt-3">Yazar: {kitap.yazar}</h5>
                    <h5 className="mt-3">Kategori: {kitap.kategori}</h5>
                    <h5 className="mt-3">Durumu: {kitap.durumu}</h5>
                </div>
            </div>
            <p className="">Kategori: {kitap.aciklama}</p>

            <br /><br />

            <h4 className="mb-4">Kitap Hakkında Yorumlar</h4>

            {yorumlar.map((yorum) => {
                return (
                    <div key={yorum.id} className="bg-dark text-white p-3 mt-3 rounded">
                        <h6 className="mb-3 text-danger">{yorum.kullanici_adi}</h6>
                        <p>{yorum.kullanici_yorumu}</p>
                    </div>
                )
            })}

            {oturumdakiKisi.rol && <div className="col-14 mt-3">

                <small>Yorum:</small>
                <textarea type="text"
                    className="form-control mb-1"
                    placeholder="yorumunuz..."
                    required
                    rows="4"
                    value={yorum}
                    onChange={(e) => setYorum(e.target.value)} />
                <div className="text-center mt-3 mb-5">
                    <button type="submit"
                        className="btn btn-primary w-50"
                        onClick={(e) => handleForm(e)}
                    >Yorum Ekle</button>
                </div>

            </div>}


        </div>
    );
};

export default KitapDetay;