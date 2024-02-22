from odoo import models, fields

class Exorcismo(models.Model):
    _name = 'exorcismo.puntuacion'
    _description = 'La puntuación del exorcismo'

    name = fields.Char(string='Name')
    date = fields.Date(string='Date')
    score = fields.Integer(string='Score')