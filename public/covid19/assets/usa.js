import { chartUsa } from "./chartUsa.js";

$("#formulario").submit(async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("inputPassword").value;
  const JWT = await getToken(email, password);
  getEndpoints(JWT)


  // console.log(email);
  // console.log(password);
  // console.log(JWT);
});

const getToken = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    localStorage.clear();
    console.log(`Error: ${err}`);
  }
};

const getEndpoints = async (JWT) => {
  try {
    $("#loader-out").show();
    const endUrls= ["confirmed", "deaths", "recovered"];
    const getUsa = endUrls.map(async(endUrl)=>{
      const response = await fetch(`http://localhost:3000/api/${endUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JWT}`
        }
      });
      const {data} = await response.json();

      return (data);
    });

  const [confirmed, deaths, recovered] = await Promise.all(getUsa);
  toggleFormAndTable("form", "chart", "table", "salir");
  const fecha = confirmed.map((f) => f.date)
  chartUsa([confirmed, deaths, recovered], fecha);

  } catch (err) {
    localStorage.clear();
    console.log(`Error: ${err}`);
  }
  finally {
    $("#loader-out").hide();
  }
}

const toggleFormAndTable = (form, chart, table, salir) => {
  $(`#${form}`).toggle();
  $(`#${chart}`).toggle();
  $(`#${table}`).toggle();
  $(`#${salir}`).toggle();
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    getEndpoints(token);
  }
};
init();

$("#salir").click(async (e) => {
  e.preventDefault();
  localStorage.clear();
  location.reload();
});
