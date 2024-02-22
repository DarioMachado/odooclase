from odoo import http
from odoo.http import request
from odoo import fields

class JuegoController(http.Controller):

    @http.route('/exorcismo/insertar', type='json', auth='public', methods=['POST', 'OPTIONS'], cors='*')
    def your_api_endpoint(self, **post):
        if request.httprequest.method == 'OPTIONS':
            # Handle OPTIONS request
            response = http.Response()
            response.headers.add('Access-Control-Allow-Origin', 'https://htmlpreview.github.io/')
            response.headers.add('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            return response.render()

        # Actual logic for handling POST request
        try:

            json_data = request.jsonrequest

            name = json_data.get('name')
            date = fields.Date.from_string(json_data.get('date'))
            score = json_data.get('score')

            # Create a record in the database
            new_record = request.env['exorcismo.puntuacion'].sudo().create({
                'name': name,
                'date': date,
                'score': score
            })

            return {"result": "Data inserted successfully"+name}
        except Exception as e:
            return {"error": str(e)}