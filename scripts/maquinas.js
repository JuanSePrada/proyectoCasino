import { GoogleGenerativeAI } from "@google/generative-ai";

const URLmaquinas = "https://casinoapp.free.beeceptor.com/maquinas";

const btnConsultar = document.getElementById('btnConsultar');
const btnAnalizar = document.getElementById('btnAnalizar');
const tableBody = document.getElementById('tableBody');
const txtPregunta = document.getElementById('txtPregunta');
let informacionDataTable = "";

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-target');
            if (page) {
                window.location.href = page;
            }
        });
    });
});

btnConsultar.addEventListener('click', async function () {
    try {
        const res = await fetch(URLmaquinas, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        tableBody.innerHTML = '';
        informacionDataTable = "";

        if (Array.isArray(data) && data.length > 0) {

            informacionDataTable = "Nombre | Monedas Disponibles | Cantidad de Juegos | Premios Entregados\n";

            data.forEach(maquina => {
                const row = document.createElement('tr');
                const cells = [
                    maquina.NombreMaquina || '',
                    maquina.CantidadMonedas || '',
                    maquina.CantidadJuego || '',
                    maquina.PremioEntregados || ''
                ];

                cells.forEach(cellText => {
                    const td = document.createElement('td');
                    td.textContent = cellText;
                    row.appendChild(td);
                });

                tableBody.appendChild(row);
                informacionDataTable += `${cells.join(' | ')}\n`;
            });

            btnAnalizar.disabled = false;
            txtPregunta.disabled = false;
        } else {
            tableBody.innerHTML = '<tr><td colspan="4">No se encontraron registros.</td></tr>';
            btnAnalizar.disabled = true;
            txtPregunta.disabled = true;
        }
    } catch (error) {
        console.error(error);
        alert("Error al cargar datos");
    }
});

btnAnalizar.addEventListener('click', async function () {
    const key = "AIzaSyCCphim--dKhbwsh67xoptvTyenVJhFeuA"
    const responseText = document.getElementById('responseText');
    const respuestaText = document.getElementById('respuestaText');

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Analiza la siguiente tabla de datos y contesta la siguiente pregunta de forma directa: ${txtPregunta.value}\n\nDatos:\n${informacionDataTable}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        responseText.textContent = response.text();
        respuestaText.style.display = 'block';

    } catch (error) {
        console.error(error);
        alert("Error al conectar con Gemini");
    }
});