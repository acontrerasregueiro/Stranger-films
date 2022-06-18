const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      peliculas: [],
      peliculasPrueba: [],
      peliculasPopulares: [],
      peliculasporVotos: [],
      carrousel: [],
      posters: [],
      generos: [],
      proximamente: [],
      enCines: [],
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      popularidad: () => {
        console.log("ORDENANDO POR POPULARIDAD");
        let store = getStore();

        store.peliculas.sort(function (a, b) {
          if (a.popularity > b.popularity) {
            return 1;
          }
          if (a.popularity < b.popularity) {
            return -1;
          }
          return 0;
        });
        setStore({ peliculasPopulares: store.peliculas });
        console.log(getStore());
      },
      cargaPopulares: async () => {
        //CONECTAMOS A LA API EXTERNA Y TRATAMOS DE LEER LAS PELICULAS
        console.log("INTENTAMOS CONECTAR A LA API EXTERNA");
        //ÚNICAMENTE SE ESTÁ CARGANDO LA PRIMERA PAGINA, PELICULAS EN INGLES

        await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=87330f0fa794fb3eb980c887157031c9"
        )
          .then((response) => response.json())
          .then((data) => {
            //console.log(data.results);
            setStore({ peliculasPopulares: data.results });
          })
          .catch((error) => console.log(error));
      },
      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      generosDePeliculas: async () => {
        console.log("buscando los generos de las pelis en la API");

        await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=87330f0fa794fb3eb980c887157031c9"
        )
          .then((response) => response.json())
          .then((data) => {
            //console.log(data.genres);
            setStore({ generos: data.genres });
          })
          .catch((error) => console.log("Algo salió mal", error));
      },
      peliculasGenerales: async () => {
        console.log("generando el array de todas las pelis");
        var peliculasTotales = [];
        var actions = getActions();
        for (var pagina = 1; pagina < 21; pagina++) {
          await fetch(
            "https://api.themoviedb.org/3/discover/movie?api_key=87330f0fa794fb3eb980c887157031c9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
              pagina +
              "&with_watch_monetization_types=flatrate"
          )
            .then((response) => response.json())
            .then((data) => {
              //console.log(data.results);
              peliculasTotales = [...peliculasTotales, ...data.results];
              setStore({ peliculas: peliculasTotales });
            })
            // .then(state.actions.cargarCarrousel())
            .catch((error) => console.log("Algo salió mal", error));
        }
        let store = getStore();
        actions.topRated();
        actions.cargarCarrousel();
        actions.proximamente();
        actions.enCines();
        // actions.popularidad();

        console.log("PELICULAS TOTALES", store.peliculas);
        // actcargarCarrousel();
      },
      filtroDeGenero(genero) {
        console.log("ejecutando filtro de genero", genero);
        var indicePeliculas = [];
        const store = getStore();
        for (var i = 0; i < store.peliculas.length - 1; i++) {
          for (var x = 0; x < store.peliculas[i].genre_ids.length - 1; x++) {
            if (store.peliculas[i].genre_ids[x] == genero) {
              //SI ES DEL GENERO ACCION (12) MOSTRAMOS EL TITULO
              console.log(
                "DESDE FLUX => ENCONTRADA PELICULO CON GENERO ",
                genero,
                "  ",
                store.peliculas[i].original_title
              );
              indicePeliculas.push(i);
            } //FIN IF
          }
        }
        console.log("peliculas genero ", indicePeliculas);
        store.peliculasPrueba = indicePeliculas;
        // setStore({ peliculasPrueba: indicePeliculas });
        console.log(store.peliculasPrueba);
      },
      enCines: async () => {
        console.log("en cines.... buscando");

        await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=87330f0fa794fb3eb980c887157031c9&page=1"
        )
          .then((response) => response.json())
          .then((data) => {
            //console.log(data.results);
            setStore({ enCines: data.results });
          })
          .catch((error) => console.log("Algo salió mal", error));
        let actions = getActions();
        actions.popularidad();
      },
      topRated: () => {
        let store = getStore();
        store.peliculas.sort(function (a, b) {
          if (a.vote_average < b.vote_average) {
            return 1;
          }
          if (a.vote_average > b.vote_average) {
            return -1;
          }
          return 0;
        });
        // const actions = getActions();

        // console.log("peliculas ordenadas por votos", store.peliculas);
      },

      popularidad: () => {
        let store = getStore();
        store.peliculasPopulares = store.peliculas;
        console.log("ORDENANDO POR POPULARIDAD");

        store.peliculasPopulares.sort(function (a, b) {
          if (a.popularity < b.popularity) {
            return 1;
          }
          if (a.popularity > b.popularity) {
            return -1;
          }
          return 0;
        });
        // setStore({ peliculasPopulares: store.peliculas });
        for (var i = 0; i < 20; i++) {
          console.log(
            "peliculas por popularidad ",
            store.peliculasPopulares[i].popularity,
            " " + store.peliculasPopulares[i].title
          );
        }
      },
      cargarCarrousel: () => {
        //Funcion para cargar las tres peliculas AL AZAR para el carrousel
        const store = getStore();
        var tresAleatorios = [];
        for (let i = 0; i < 3; i++) {
          tresAleatorios.push(Math.floor(Math.random() * 399 + 1));
        }
        console.log(tresAleatorios);
        for (var i = 0; i < 3; i++) {
          store.carrousel.push(store.peliculas[tresAleatorios[i]]);
        }
        console.log(store.carrousel);
      },
      proximamente: async () => {
        console.log("buscando las pelis en la API");

        await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=87330f0fa794fb3eb980c887157031c9&page=1"
        )
          .then((response) => response.json())
          .then((data) => {
            //console.log(data.results);
            setStore({ proximamente: data.results });
          })
          .catch((error) => console.log("Algo salió mal", error));
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
