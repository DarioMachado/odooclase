# -*- coding: utf-8 -*-
# from odoo import http


# class Iglesia(http.Controller):
#     @http.route('/iglesia/iglesia/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/iglesia/iglesia/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('iglesia.listing', {
#             'root': '/iglesia/iglesia',
#             'objects': http.request.env['iglesia.iglesia'].search([]),
#         })

#     @http.route('/iglesia/iglesia/objects/<model("iglesia.iglesia"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('iglesia.object', {
#             'object': obj
#         })
