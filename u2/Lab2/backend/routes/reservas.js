const express = require('express');
const Reserva = require('../models/Reserva');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protege todas las rutas siguientes con autenticación
router.use(authMiddleware);

// Listar todas las reservas del usuario autenticado
router.get('/', async (req, res) => {
  const reservas = await Reserva.find({ usuario: req.userId });
  res.json(reservas);
});

// Crear nueva reserva
router.post('/', async (req, res) => {
  const { fecha, sala, hora } = req.body;

  const nueva = new Reserva({
    usuario: req.userId,
    fecha,
    sala,
    hora
  });

  // control de reserva obligatoria con valores especificos
  // if (!sala || ["A", "B", "C"].includes(sala)){
  //   return res.status(400).json({ msg: "Sala Inválida"})
  // }

  await nueva.save();
  res.status(201).json(nueva);
});

// Eliminar una reserva (solo si pertenece al usuario)
router.delete('/:id', async (req, res) => {
  const result = await Reserva.deleteOne({ _id: req.params.id, usuario: req.userId });
  if (result.deletedCount === 0){
    return res.status(404).json({ msg: 'Reserva no encontrada o no autorizada'})
  }
  res.json({ msg: 'Reserva cancelada' });
});

module.exports = router;