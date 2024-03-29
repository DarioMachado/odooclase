from odoo import models, fields, api
import os

class Exorcismo(models.Model):
    _name = 'exorcismo.puntuacion'
    _description = 'La puntuación del exorcismo'

    name = fields.Char(string='Nombre')
    date = fields.Date(string='Fecha')
    score = fields.Integer(string='Puntuación')


    def jugar(self):
        view_id = self.env.ref('exorcismo.your_modal_view_id').id
        return {
            'name': 'El jueguito',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'ir.actions.act_window',
            'target': 'new',
            'views': [(view_id, 'form')],
            'type': 'ir.actions.act_window',
            'context': {
                'default_iframe_url': 'https://htmlpreview.github.io/?https://github.com/DarioMachado/odooclase/blob/main/index.html'
            }
        }

    @api.model
    def view_init(self, fields_list):
        super(Exorcismo, self).view_init(fields_list)
        view_type = self.env.context.get('view_type')
        if view_type == 'form':
             self.jugar()
        else:
            pass


