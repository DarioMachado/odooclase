from odoo import models, fields, api

class IglesiaEvento(models.Model):
    _name = 'iglesia.evento'
    _description = 'Eventos de la Iglesia'

    nombre = fields.Char(string='Nombre del Evento', required=True)
    descripcion = fields.Text(string='Descripción')
    fecha_evento = fields.Date(string="Fecha del evento", required=True)
    ubicacion = fields.Char(string='Ubicación')
    organizador = fields.Char(string='Organizador')
    asistentes = fields.Integer(string='Asistentes')
    notas = fields.Text(string='Notas')