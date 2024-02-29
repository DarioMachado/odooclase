from odoo import models, fields, api


class IglesiaDonacion(models.Model):
    _name = 'iglesia.donacion'

    fecha_donacion = fields.Date(string="Fecha")
    nombre = fields.Char(string="Nombre")
    apellidos = fields.Char(string="Apellidos")
    num_tarjeta = fields.Char(string="Número de la tarjeta")
    fecha_caducidad = fields.Date(string='Fecha de caducidad',
                              help="Selecciona solo el año y el mes",
                              options="{'datepicker': 'year','yearRange': '1900:' + (new Date()).getFullYear() + 10}")
    codigo = fields.Integer(string="Código de seguridadd")
    cantidad = fields.Float(string="Cantidad", required=True)

