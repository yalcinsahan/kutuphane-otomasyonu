import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext'

const Kayit = () => {

    const [ad, setAd] = useState("")
    const [soyad, setSoyad] = useState("")
    const [email, setEmail] = useState("")
    const [sifre, setSifre] = useState("")
    const { oturumDurumu, kullaniciRolAyarla } = useContext(AppContext)
    const [durum, setDurum] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();
        ad === "" || soyad === "" || email === "" || sifre === ""
            ? alert("boş alan bırakılamaz")
            : axios.post("http://localhost:8080/kullanicilar",
                { ad, soyad, email, sifre }).then(() => {
                    setDurum(true)
                })
    }

    if (durum === true) return <Redirect to="/" />

    return (
        <div className="container col-10 col-md-6">

            <h3 className="my-5 text-center">Kayıt Formu</h3>

            <form>
                <div class="form-group row">
                    <div className="col-6">
                        <small>Ad:</small>
                        <input type="text"
                            className="form-control"
                            placeholder="adınız..."
                            required
                            value={ad}
                            onChange={(e) => setAd(e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <small>Soyad:</small>
                        <input type="text"
                            className="form-control"
                            placeholder="soyadınız..."
                            required
                            value={soyad}
                            onChange={(e) => setSoyad(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <small>Email:</small>
                    <input type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="email..."
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <small>Şifre:</small>
                    <input type="password"
                        className="form-control"
                        placeholder="şifre..."
                        required
                        value={sifre}
                        onChange={(e) => setSifre(e.target.value)} />
                </div>

                <div className="text-center mt-4">
                    <button type="submit"
                        className="btn btn-primary w-50"
                        onClick={handleForm}
                    >Kaydol</button>
                </div>
            </form>
        </div>
    );
};

export default Kayit;