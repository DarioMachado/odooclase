from odoo import http
from odoo.http import request

class JuegoController(http.Controller):

    @http.route('/exorcismo/insertar', type='json', auth='user')
    def insert_score(self, name, score):
        game_score_obj = request.env['exorcismo.puntuacion']
        game_score_obj.create({'name': name, 'score': score})
        return {'success': True}



