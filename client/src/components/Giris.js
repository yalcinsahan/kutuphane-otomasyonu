import React, { useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import AppContext from '../AppContext';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const Giris = () => {

    const { oturumDurumu, oturumdakiKisi } = useContext(AppContext);

    const [kullanicilar, setKullanicilar] = useState([]);
    const [email, setEmail] = useState("normaluye@gmail.com");
    const [sifre, setSifre] = useState("123");


    useEffect(() => {
        axios.get("http://localhost:8080/kullanicilar").then(result => {
            setKullanicilar(result.data);
        }).catch(err => console.log(err))
    }, []);

    const girisKontrol = (e) => {
        e.preventDefault();

        if (email === "" || sifre === "") {
            alert("tüm alanları doldurun");
        }
        else {
            for (let i = 0; i < kullanicilar.length; i++) {
                if (kullanicilar[i].email === email && kullanicilar[i].sifre === sifre) {
                    oturumDurumu(kullanicilar[i]);
                }
                else if (i < kullanicilar.length) {

                }
                else {
                    alert("kullanıcı adı veya şifre hatalı")
                }

            }
        }


    }

    if (oturumdakiKisi.rol) return <Redirect to="/" />

    return (
        <div className="container col-8 col-lg-4">

            <h3 className="my-5 text-center">Giriş Formu</h3>

            <form>

                <div className="form-group">
                    <small>Email:</small>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="email..."
                        required />
                </div>
                <div className="form-group">
                    <small>Şifre:</small>
                    <input type="password"
                        value={sifre}
                        onChange={(e) => setSifre(e.target.value)}
                        className="form-control"
                        placeholder="şifre..."
                        required />
                </div>

                <div className="text-center mt-4">
                    <button type="submit"
                        className="btn btn-primary w-50"
                        onClick={girisKontrol}
                    >Giriş Yap</button>
                </div>
            </form>
        </div>
    )
};

export default Giris;