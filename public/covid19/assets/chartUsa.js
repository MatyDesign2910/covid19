let myChart

const chartUsa = (datos,fecha) => {

  console.log(datos)

  if(myChart) {
    myChart.destroy();
  }

  /*datos.forEach(({ date, total }) => {
    dateArr.push(date);
    console.log(datos)
    if (table == "confirmed") {
      console.log(total)
      confirmArr.push(total);
    }
    if (table == "deaths") {
      console.log(total)
      deathArr.push(total);
    }
    if (table == "recovered") {
      console.log(total)
      recovArr.push(total);
    }
  });*/

  const [confirmArr, deathArr, recovArr] = datos.map((element) => {
    return element.map((data) => data.total);
  });

  const charts = {
    labels: fecha,
    datasets: [
      {
        label: "Confirmados",
        data: confirmArr,
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Muertos",
        data: deathArr,
        borderColor: "#65a3ff73",
        backgroundColor: "#65a3ff73",
      },
      {
        label: "Recuperados",
        data: recovArr,
        borderColor: "#37d0a37d",
        backgroundColor: "#37d0a37d",
      },
    ],
  };

  const config = {
    type: "line",
    data: charts,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  };
  myChart = new Chart(document.getElementById("myChart"), config);

  myChart.render()
};

export { chartUsa };
