from odoo import models, fields, api

class Exorcismo(models.Model):
    _name = 'exorcismo.puntuacion'
    _description = 'La puntuación del exorcismo'

    name = fields.Char(string='Name')
    date = fields.Date(string='Date')
    score = fields.Integer(string='Score')


    def jugar(self):
        # Add your code here to open a modal view with an iframe
        view_id = self.env.ref('exorcismo.your_modal_view_id').id
        return {
            'name': 'Modal View with Iframe',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'ir.actions.act_window',
            'target': 'new',
            'views': [(view_id, 'form')],
            'type': 'ir.actions.act_window',
            'context': {
                'default_iframe_url': 'https://htmlpreview.github.io/?https://github.com/DarioMachado/odooclase/blob/main/index.html'  # URL for your iframe
            }
        }