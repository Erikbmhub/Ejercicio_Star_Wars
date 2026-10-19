
console.log("Hola");

// 1. OBTENER LAS PELÍCULAS

async function getPelis() {
  try {
    const res = await fetch("https://swapi.dev/api/films/"); 
    const data = await res.json();

    return data.results;
  } catch (error) {
    console.error("Error en getPelis:", error);
    return [];
  }
}
getPelis().then((data) => {
  console.log(data);
});

// 2. PINTAR LA GRÁFICA DE PELÍCULAS

function paintGraph(data) {
  console.log("Películas recibidas:", data);

  const titles = data.map((peli) => peli.title);

  const años = data.map((peli) =>
    Number(peli.release_date.slice(0, 4))
  );

  console.log("Títulos:", titles);
  console.log("Años:", años);

  new Chartist.Bar(
    ".ct-chart",
    {
      labels: titles,
      series: [años],
    },
    {
      axisY: {
        low: 1970,
        onlyInteger: true,
        scaleMinSpace: 20,
        referenceValue: 1970
      },
    }
  );
}

// 3. OBTENER LOS PERSONAJES

async function getProtas() {
  try {
    const res = await fetch("https://swapi.dev/api/people/");

    const data = await res.json();

    return data.results;
  } catch (error) {
    console.error("Error en getProtas:", error);
    return [];
  }
}

// 4. PINTAR LA GRÁFICA DE PERSONAJES

function chartersFilms(data) {
  console.log("Personajes recibidos:", data);

  const personajes = data.map((personaje) => personaje.name);

  const pelisHechas = data.map(
    (personaje) => personaje.films.length
  );

  console.log("Personajes:", personajes);
  console.log("Películas por personaje:", pelisHechas);

  new Chartist.Bar(
    ".ct-chart2",
    {
      labels: personajes,
      series: [pelisHechas],
    },
    {
      axisY: {
        low: 0,
        onlyInteger: true,
        scaleMinSpace: 40,
      },
      height: "500px",
    }
  );
}

// 5. EJECUTAR LAS DOS GRÁFICAS

getPelis().then((data) => paintGraph(data));

getProtas().then((data) => chartersFilms(data));
