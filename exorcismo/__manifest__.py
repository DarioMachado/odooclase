# -*- coding: utf-8 -*-
{
    'name': "exorcismo",

    'summary': """
        Aquí se exorcizan los demonios del Odoo.""",

    'description': """
        Exorcismo digital.
    """,

    'author': "Darío",
    'website': "http://www.github.com/DarioMachado",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/menu.xml',
        'views/juegoview.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'application': True
}
