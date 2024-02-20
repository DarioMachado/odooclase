# -*- coding: utf-8 -*-
# from odoo import http


# class Palabradios(http.Controller):
#     @http.route('/palabradios/palabradios/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/palabradios/palabradios/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('palabradios.listing', {
#             'root': '/palabradios/palabradios',
#             'objects': http.request.env['palabradios.palabradios'].search([]),
#         })

#     @http.route('/palabradios/palabradios/objects/<model("palabradios.palabradios"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('palabradios.object', {
#             'object': obj
#         })
