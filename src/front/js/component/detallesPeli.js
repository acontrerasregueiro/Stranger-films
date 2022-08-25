import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
//import "../../styles/home.css";
import { useParams } from "react-router-dom";
import "../../styles/detallesPeli.css";
import Trailer from "./pupUpTrailer";
//COMPONENTES
import CardPelicula from "./card-pelicula";

export const DetallesPeli = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [favmovie, setFavmovie] = useState("");
  const [newcomment, setNewcomment] = useState("");

  console.log(params);
  useEffect(() => {
    actions.getAllcommentsForOneMovie(params.theid);
  }, []);
  //test git comment
  return store.peliculas.map(function (obj, index) {
    if (obj.id == params.theid) {
      //con.log("params = ", +params.theid + "id " + obj.id);
      return (
        <div className=" general" key={index}>
          <div className="divImg">
            <img
              src={"https://image.tmdb.org/t/p/w500/" + obj.backdrop_path}
              className="d-block w-100 imagenLarga"
            />
          </div>
          <div className="container general2 pb-4">
            <div className="d-flex">
              <div className="row detallesPelis3 rounded d-block p-5">
                <div className="">
                  <CardPelicula
                    poster={`https://image.tmdb.org/t/p/w500/${obj.poster_path}`}
                    averageVote={
                      <div>
                        <i
                          style={{ color: "yellow" }}
                          className="fas fa-star me-1 mt-1"
                        ></i>
                        {obj.vote_average}
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="d-flex">
                  <h2 className="detallesPelis text-light">{obj.title}</h2>{" "}
                  <h4 className="p-2">({obj.release_date})</h4>
                </div>
                <div className="border border-dark bg-gradient mt-3 p-3">
                  <div className="text-light">
                    <h4>SINOPSIS</h4>
                    <p className="descripcion p-3">{obj.overview}</p>
                  </div>
                  <div className="text-light mt-2 d-flex">
                    <h4>IDIOMA ORIGINAL</h4>
                    <p className="descripcion ms-3"> {obj.original_language}</p>
                  </div>
                  <div className="text-light mt-2">
                    <h4>POPULARIDAD</h4>
                    <p className="descripcion ms-2">
                      <i className="fas fa-fire"></i> {obj.popularity}
                    </p>
                  </div>
                  <div className="text-light mt-2">
                    <h4>GENERO</h4>
                    <p className="descripcion ms-3"> PONER GENERO AQUI{}</p>
                  </div>
                  <div className="mt-4">
                    <Trailer trailer={obj.trailer} />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="col-6">
                <div>
                  {localStorage.getItem("token") ? (
                    <>
                      {" "}
                      <div className="ps-2 d-flex ms-5">
                        <textarea
                          className="p-2"
                          type="comments"
                          rows="4"
                          cols="60"
                          placeholder="Deja tu comentario..."
                          onChange={(e) => setNewcomment(e.target.value)}
                        ></textarea>
                        <button
                          type="button"
                          className="btn btn-outline-danger ms-2"
                          onClick={() => {
                            actions.newcomment(newcomment, obj.id);
                          }}
                        >
                          Enviar
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-light border border-danger p-3 mx-5 rounded">
                      <h5>Para dejar tu comentario inicia sesión</h5>
                    </div>
                  )}
                  {/*SECCION DE COMENTARIOS*/}
                  <div className="comentario-texto p-1 mt-2 ms-5 col-9">
                    <h4>COMENTARIOS</h4>
                    <div className="ms-1 bg-gradient p-1">
                      {store.commentsForOneMovie.map((value, index) => {
                        return (
                          <>
                            <li key={value.id}>
                              {/*<p>{value.user_name ? user_name : ""}</p>*/}

                              <p>
                                <i className="fas fa-comment me-3 ps-2"></i>
                                {value.user_comment
                                  ? value.user_name + ": " + value.user_comment
                                  : "No hay comentarios"}
                              </p>
                            </li>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 text-center">
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + obj.backdrop_path}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};
{
  /*<form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >*/
}
{
  /*</form>*/
}

{
  /*<div className="form-group">
                    <label>Comentario</label>
                    <p className="clasificacion">
                      <input
                        id="radio1"
                        type="radio"
                        name="estrellas"
                        value="5"
                      />
                      <label for="radio1">★</label>
                      <input
                        id="radio2"
                        type="radio"
                        name="estrellas"
                        value="4"
                      />
                      <label for="radio2">★</label>
                      <input
                        id="radio3"
                        type="radio"
                        name="estrellas"
                        value="3"
                      />
                      <label for="radio3">★</label>
                      <input
                        id="radio4"
                        type="radio"
                        name="estrellas"
                        value="2"
                      />
                      <label for="radio4">★</label>
                      <input
                        id="radio5"
                        type="radio"
                        name="estrellas"
                        value="1"
                      />
                      <label for="radio5">★</label>
                    </p>
                  </div>*/
}
