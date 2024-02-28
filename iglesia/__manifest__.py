# -*- coding: utf-8 -*-
{
    'name': "iglesia",

    'summary': """
        Gestión de iglesia en el odoo""",

    'description': """
        Long description of module's purpose
    """,

    'author': "Darío",
    'website': "http://github.com/DarioMachado",

    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    'application': True,

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/iglesia_miembro_views.xml',
        'views/menu.xml',
    ],

}
