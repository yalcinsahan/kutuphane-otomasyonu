import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Giris from './Giris.js'
import Anasayfa from './Anasayfa.js'
import Kayit from './Kayit.js'
import YeniKitap from './YeniKitap.js'
import '../css/Navbar.css'
import AppContext from '../AppContext.js';
import KitapDetay from './KitapDetay.js'
import Bilgilerim from './Bilgilerim.js'
import KitabiVer from './KitabiVer'
import KitabiAl from './KitabiAl'

const Navbar = () => {

    const { oturumdakiKisi } = useContext(AppContext)

    return (
        <Router>

            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav col-12">

                            <div className="d-flex justify-content-between col-12">
                                <div className="row ml-4">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Anasayfa</Link>
                                    </li>
                                    {oturumdakiKisi.rol === "admin" &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/yenikitap">Kitap Ekle</Link>
                                        </li>}

                                    {oturumdakiKisi.rol === "admin" &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/kitapver">Kitap Ver</Link>
                                        </li>}

                                    {oturumdakiKisi.rol === "admin" &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/kitapal">Kitap Al</Link>
                                        </li>}

                                    {oturumdakiKisi.rol &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/bilgilerim">Bilgilerim</Link>
                                        </li>}
                                </div>

                                {oturumdakiKisi.rol &&
                                    <div className="row mr-4">
                                        <li onClick={() => window.location.reload()} className="nav-item">
                                            <Link onClick={() => localStorage.setItem('oturum', JSON.stringify({}))} className="nav-link" to="/">Çıkış</Link>

                                        </li>
                                    </div>}

                                {!oturumdakiKisi.rol &&
                                    <div className="row mr-4">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/giris">Giriş</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/kayit">Kayıt</Link>
                                        </li>
                                    </div>}
                            </div>


                        </div>
                    </div>
                </nav>

                <Switch>
                    <Route exact path="/">
                        <Anasayfa />
                    </Route>
                    <Route path="/giris">
                        <Giris />
                    </Route>
                    <Route path="/kayit">
                        <Kayit />
                    </Route>
                    <Route path="/yenikitap">
                        <YeniKitap />
                    </Route>
                    <Route path="/bilgilerim">
                        <Bilgilerim />
                    </Route>
                    <Route path="/kitapver">
                        <KitabiVer />
                    </Route>
                    <Route path="/kitapal">
                        <KitabiAl />
                    </Route>
                    <Route path="/:id">
                        <KitapDetay />
                    </Route>
                </Switch>

            </div>

        </Router>
    );
};

export default Navbar;