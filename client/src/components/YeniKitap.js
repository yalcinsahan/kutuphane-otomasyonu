import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import AppContext from '../AppContext';

const YeniKitap = () => {


    const [ad, setAd] = useState("");
    const [yazar, setYazar] = useState("");
    const [kategori, setKategori] = useState("Bilim & Mühendislik");
    const [aciklama, setAciklama] = useState("");
    const [durum, setDurumu] = useState(false);
    const [selectedFile, setSelectedFile] = useState('')
    const [kategoriler, setKategoriler] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/kategoriler").then((result) => {
            setKategoriler(result.data)
        });
    }, []);

    const handleInputChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const { kitapListesi, oturumdakiKisi } = useContext(AppContext)

    const handleForm = (e) => {
        e.preventDefault();
        ad === "" || yazar === "" || aciklama === ""
            ? console.log(ad, yazar, kategori, aciklama)
            : axios.post("http://localhost:8080/kitaplar",
                { ad, yazar, kategori, aciklama }).then((result) => {

                    console.log(result);

                    kitapListesi()
                    const data = new FormData()
                    data.append('imageFile', selectedFile)
                    data.append('imageName', result.data.id.toString())
                    console.warn(selectedFile);
                    let url = "http://localhost:8080/image/yukle";

                    axios.post(url, data, { // receive two parameter endpoint url ,form data 
                    })
                        .then(res => { // then print response status
                            console.warn(res);
                            setDurumu(true)
                        })
                })
    }

    if (durum) {
        return <Redirect to="/" />
    }


    return (

        <div className="container col-10 col-lg-6">

            {oturumdakiKisi.rol ? oturumdakiKisi.rol === "üye"
                ? <h3 className="mt-3 text-center">Bu alanda yetkiniz yok.</h3>
                : (
                    <div>
                        <h3 className="mt-3 text-center">Yeni Kitap Ekle</h3>
                        <form>

                            <div className="form-group">
                                <small>Ad:</small>
                                <input type="email"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="ad..."
                                    required
                                    value={ad}
                                    onChange={(e) => setAd(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <small>Yazar:</small>
                                <input type="text"
                                    className="form-control"
                                    placeholder="yazar..."
                                    value={yazar}
                                    onChange={(e) => setYazar(e.target.value)}
                                    required />
                            </div>

                            <div value={kategori} onChange={(e) => setKategori(e.target.value)} className="form-group mt-3">
                                <small>Kategori:</small>
                                <select className="form-control">
                                    {kategoriler.map((kat) => <option key={kat.id}>{kat.ad}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <small>Açıklama:</small>
                                <textarea type="text"
                                    className="form-control"
                                    placeholder="açıklama..."
                                    required
                                    rows="8"
                                    value={aciklama}
                                    onChange={(e) => setAciklama(e.target.value)} />
                            </div>


                            <div className="p-0 col-12">
                                <input type="file" className="" name="upload_file" onChange={(e) => handleInputChange(e)} />
                            </div>


                            <div className="text-center mt-4">
                                <button type="submit"
                                    className="btn btn-primary w-50"
                                    onClick={(e) => handleForm(e)}
                                >Kitap Ekle</button>
                            </div>
                        </form>
                    </div>

                )
                : <h3 className="mt-3 text-center">Kitap Eklemek için giriş yapmalısınız..</h3>
            }


        </div >
    )
};

export default YeniKitap;