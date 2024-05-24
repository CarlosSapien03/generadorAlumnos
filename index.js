const fs = require('fs');

const nombres = ["Juan", "María", "Pedro", "Ana", "Luis", "Laura", "José", "Carmen", "Carlos", "Lucía", "Manuel", "Elena", "Francisco", "Rosa", "Antonio", "Marta", "Miguel", "Pilar", "Javier", "Teresa"];
const apellidos1 = ["García", "Martínez", "López", "Sánchez", "Pérez", "González", "Rodríguez", "Fernández", "Gómez", "Díaz", "Moreno", "Álvarez", "Muñoz", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres", "Domínguez", "Vázquez"].concat(
    Array(5).fill(["Hernández", "Jiménez", "Ruiz", "Molina", "Castro", "Ortiz", "Rubio", "Serrano", "Blanco", "Morales", "Suárez", "Aguilar", "Ramos", "Vega", "Cabrera", "Flores", "Nieto", "Herrera", "Peña", "Santos"]).flat()
);
const apellidos2 = ["Hernández", "Jiménez", "Ruiz", "Molina", "Castro", "Ortiz", "Rubio", "Serrano", "Blanco", "Morales", "Suárez", "Aguilar", "Ramos", "Vega", "Cabrera", "Flores", "Nieto", "Herrera", "Peña", "Santos"].concat(
    Array(5).fill(["García", "Martínez", "López", "Sánchez", "Pérez", "González", "Rodríguez", "Fernández", "Gómez", "Díaz", "Moreno", "Álvarez", "Muñoz", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres", "Domínguez", "Vázquez"]).flat()
);

function generarAlumnos(n) {
    const alumnos = [];
    for (let i = 0; i < n; i++) {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido1 = apellidos1[Math.floor(Math.random() * apellidos1.length)];
        const apellido2 = apellidos2[Math.floor(Math.random() * apellidos2.length)];
        alumnos.push({
            nombre,
            apellido1,
            apellido2
        });
    }
    return alumnos;
}

function exportarCSV(alumnos, filename) {
    const csvData = ['nombre,apellido1,apellido2'];
    alumnos.forEach(alumno => {
        csvData.push(`${alumno.nombre},${alumno.apellido1},${alumno.apellido2}`);
    });
    fs.writeFileSync(filename, csvData.join('\n'));
}

function exportarJSON(alumnos, filename) {
    fs.writeFileSync(filename, JSON.stringify(alumnos, null, 4));
}

function exportarSQL(alumnos, filename) {
    const sqlData = [
        "CREATE TABLE alumnos (",
        "    id INT PRIMARY KEY AUTO_INCREMENT,",
        "    nombre VARCHAR(50),",
        "    apellido1 VARCHAR(50),",
        "    apellido2 VARCHAR(50)",
        ");",
        ""
    ];
    alumnos.forEach(alumno => {
        sqlData.push(`INSERT INTO alumnos (nombre, apellido1, apellido2) VALUES ('${alumno.nombre}', '${alumno.apellido1}', '${alumno.apellido2}');`);
    });
    fs.writeFileSync(filename, sqlData.join('\n'));
}

const numeroAlumnos = 10;
const alumnos = generarAlumnos(numeroAlumnos);
exportarCSV(alumnos, 'alumnos.csv');
exportarJSON(alumnos, 'alumnos.json');
exportarSQL(alumnos, 'alumnos.sql');

console.log("Exportación completada.");
