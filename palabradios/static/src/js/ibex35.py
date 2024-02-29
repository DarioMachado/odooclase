import requests
from bs4 import BeautifulSoup

url = 'https://www.expansion.com/mercados/cotizaciones/indices/ibex35_I.IB.html'

response = requests.get(url)

if response.status_code == 200:

    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find('table', id='listado_valores')

    if table:

        table_body = table.find('tbody')

        rows = table_body.find_all('tr')

        companies = [row.find('td', class_='primera').text.strip() for row in rows]

        prices = [row.find_all('td')[1].text.strip() for row in rows]

        variacion = [row.find_all('td')[2].text.strip().replace(',', '.') for row in rows]

        with open('script.js', 'w') as js_file:
            js_file.write("var companies = " + str(companies) + ";\n")
            js_file.write("var prices = " + str(prices) + ";\n")
            js_file.write("var variacion = " + str(variacion) + ";\n")

            with open('template_ibex.js', 'r') as template_file:
                js_file.write(template_file.read())
                
            print("Todo ha salido bien")
    else:
        print("Problema al encontrar la tabla...")
else:
    print("Problema con la página web...")
