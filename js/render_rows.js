//script.js
const firebaseUrl = "https://practica-humedad-temperatura-default-rtdb.firebaseio.com/dht.json"; // URL principal para acceder a todas las subtablas
const authToken = null; // Token de autenticación (si es necesario, puedes agregarlo)

async function fetchDHTData() {
  try {
    let url = firebaseUrl;
    if (authToken) {
      url += `?auth=${authToken}`;
    }

    // Realizar la solicitud HTTP GET para obtener todos los registros de la base de datos
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parsear la respuesta en JSON
    const data = await response.json();

    // Limpiar la tabla antes de agregar nuevos registros
    const tableBody = document.getElementById("table_register");
    tableBody.innerHTML = '';

    // Recorrer cada subtabla y agregar filas dinámicamente
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const sensorData = data[key]; // Datos de cada subtabla (4muhslime, latest, etc.)

        // Crear una nueva fila para cada subtabla
        const newRow = document.createElement("tr");

        // Crear las celdas con la información de cada subtabla
        const timestampCell = document.createElement("td");
        timestampCell.textContent = sensorData.timestamp;
        //timestampCell.textContent = key ; // Nombre de la tabla: osea, la fecha xD

        const temperatureCell = document.createElement("td");
        temperatureCell.textContent = sensorData.Temperatura_dht;

        const humidityCell = document.createElement("td");
        humidityCell.textContent = sensorData.Humedad_dht;

        const humidityYl69Cell = document.createElement("td");
        humidityYl69Cell.textContent = sensorData.Humedad_yl69;

        // Agregar las celdas a la fila
        newRow.appendChild(timestampCell);
        newRow.appendChild(temperatureCell);
        newRow.appendChild(humidityCell);
        newRow.appendChild(humidityYl69Cell);

        // Agregar la fila a la tabla
        tableBody.appendChild(newRow);
      }
    }
  } catch (error) {
    console.error("Error al obtener datos de Firebase:", error);
  }
}

// Llamar a la función al cargar la página
fetchDHTData();

// Actualizar los datos cada 5 segundos para simular tiempo real
setInterval(fetchDHTData, 5000);

