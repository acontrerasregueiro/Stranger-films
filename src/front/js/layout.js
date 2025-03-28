import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LogIn } from "./component/login";
import { Genero } from "./component/genero";
import Detalles from "./component/descripPoster";
import { DetallesPeli } from "./component/detallesPeli";
import Busqueda from "./component/busquedaPeli";
import Stranger from "./component/strangerFilms";
import Api from "./component/footerApi";
import Aportaciones from "./component/aportacionesFooter";
import Register from "./component/register";
import { Populares } from "./pages/populares";
import { UltimosEstrenos } from "./pages/ultimosEstrenos";
import { TopRated } from "./pages/topRated";
import { Proximamente } from "./pages/proximamente";
import { DetallesCine } from "./component/detallesCine";
import { DetallesProx } from "./component/detallesProximamente";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/busqueda/:inputText">
              <Busqueda />
            </Route>
            <Route exact path="/strangerFilms">
              <Stranger />
            </Route>
            <Route exact path="/Api">
              <Api />
            </Route>
            <Route exact path="/Aportaciones">
              <Aportaciones />
            </Route>
            <Route exact path="/Populares">
              <Populares />
            </Route>
            <Route exact path="/UltimosEstrenos">
              <UltimosEstrenos />
            </Route>
            <Route exact path="/Proximamente">
              <Proximamente />
            </Route>
            <Route exact path="/Mejorvaloradas">
              <TopRated />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/genero/:theid">
              <Genero />
            </Route>
            <Route exact path="/detalles/:theid">
              <DetallesPeli />
            </Route>
            <Route exact path="/detallesCine/:theid">
              <DetallesCine />
            </Route>
            <Route exact path="/detallesProx/:theid">
              <DetallesProx />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route>
              <LogIn />
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
