const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let pacientes = [];
let medicos = [];


app.get('/pacientes', (req, res) => {
    res.json(pacientes);
});


app.post('/pacientes', (req, res) => {
    const { idPaciente, identificacion, nombres, telefono, correo } = req.body;

    // Validar campos obligatorios
    if (!idPaciente || !identificacion || !nombres || !telefono || !correo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
   
    const existe = pacientes.find(p => p.idPaciente === idPaciente);
    if (existe) {
        return res.status(400).json({ mensaje: 'El paciente ya existe' });
    }

    const nuevoPaciente = { idPaciente, identificacion, nombres, telefono, correo };
    pacientes.push(nuevoPaciente);

    res.status(201).json(nuevoPaciente);
});
app.get('/medicos', (req, res) => {
    res.json(medicos);
});

app.post('/medicos', (req, res) => {
    const { idMedico, identificacion, nombres, telefono, correo } = req.body;

    // Validar campos obligatorios
    if (!idMedico || !identificacion || !nombres || !telefono || !correo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const existe = medicos.find(m => m.idMedico === idMedico);
    if (existe) {
        return res.status(400).json({ mensaje: 'El médico ya existe' });
    }

    const nuevoMedico = { idMedico, identificacion, nombres, telefono, correo };
    medicos.push(nuevoMedico);

    res.status(201).json(nuevoMedico);
});

app.put('/pacientes/:idPaciente', (req, res) => {
    const { idPaciente } = req.params;
    const { identificacion, nombres, telefono, correo } = req.body;

    const pacienteIndex = pacientes.findIndex(p => p.idPaciente === idPaciente);
    if (pacienteIndex === -1) {
        return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    if (identificacion) pacientes[pacienteIndex].identificacion = identificacion;
    if (nombres) pacientes[pacienteIndex].nombres = nombres;
    if (telefono) pacientes[pacienteIndex].telefono = telefono;
    if (correo) pacientes[pacienteIndex].correo = correo;

    res.json(pacientes[pacienteIndex]);
});


app.delete('/pacientes/:idPaciente', (req, res) => {
    const { idPaciente } = req.params;

    const pacienteIndex = pacientes.findIndex(p => p.idPaciente === idPaciente);
    if (pacienteIndex === -1) {
        return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    const eliminado = pacientes.splice(pacienteIndex, 1);
    res.json({ mensaje: 'Paciente eliminado', paciente: eliminado[0] });
});


app.get('/medicos', (req, res) => {
    res.json(medicos);
});


app.post('/medicos', (req, res) => {
    const { idMedico, identificacion, nombres, telefono, correo } = req.body;

   
    const existe = medicos.find(m => m.idMedico === idMedico);
    if (existe) {
        return res.status(400).json({ mensaje: 'El médico ya existe' });
    }

    const nuevoMedico = { idMedico, identificacion, nombres, telefono, correo };
    medicos.push(nuevoMedico);

    res.status(201).json(nuevoMedico);
});

app.put('/medicos/:idMedico', (req, res) => {
    const { idMedico } = req.params;
    const { identificacion, nombres, telefono, correo } = req.body;

    const medicoIndex = medicos.findIndex(m => m.idMedico === idMedico);
    if (medicoIndex === -1) {
        return res.status(404).json({ mensaje: 'Médico no encontrado' });
    }

    if (identificacion) medicos[medicoIndex].identificacion = identificacion;
    if (nombres) medicos[medicoIndex].nombres = nombres;
    if (telefono) medicos[medicoIndex].telefono = telefono;
    if (correo) medicos[medicoIndex].correo = correo;

    res.json(medicos[medicoIndex]);
});

app.delete('/medicos/:idMedico', (req, res) => {
    const { idMedico } = req.params;

    const medicoIndex = medicos.findIndex(m => m.idMedico === idMedico);
    if (medicoIndex === -1) {
        return res.status(404).json({ mensaje: 'Médico no encontrado' });
    }

    const eliminado = medicos.splice(medicoIndex, 1);
    res.json({ mensaje: 'Médico eliminado', medico: eliminado[0] });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
