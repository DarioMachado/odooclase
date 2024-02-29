from odoo import models, fields, api


class IglesiaMiembro(models.Model):
    _name = 'iglesia.miembro'

    nombre = fields.Char(string="Nombre", required=True)
    apellidos = fields.Char(string="Apellidos", required=True)
    email = fields.Char(string="Email")
    fecha_nacimiento = fields.Date(string="Fecha de nacimiento")
    fecha_bautizo = fields.Date(string="Fecha de bautizo")
    telefono = fields.Char("Número de teléfono")
    foto = fields.Binary(string="Fotografía")

