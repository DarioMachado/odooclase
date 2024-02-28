import requests
from bs4 import BeautifulSoup

# URL of the website to scrape
url = 'https://www.expansion.com/mercados/cotizaciones/indices/ibex35_I.IB.html'

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the table with id "listado_valores"
    table = soup.find('table', id='listado_valores')

    if table:
        # Find the table body within the table
        table_body = table.find('tbody')

        # Find all tr elements within the table body
        rows = table_body.find_all('tr')

        # Extract the text content of primera class from each row
        companies = [row.find('td', class_='primera').text.strip() for row in rows]

        # Extract the second child from each row (price)
        prices = [row.find_all('td')[1].text.strip() for row in rows]

        # Extract the third child from each row (variation) and replace commas with dots
        variacion = [row.find_all('td')[2].text.strip().replace(',', '.') for row in rows]

        # Write the data to JavaScript file
        with open('script.js', 'w') as js_file:
            js_file.write("var companies = " + str(companies) + ";\n")
            js_file.write("var prices = " + str(prices) + ";\n")
            js_file.write("var variacion = " + str(variacion) + ";\n")
            
            # Append content from template_ibex.js
            with open('template_ibex.js', 'r') as template_file:
                js_file.write(template_file.read())
                
            print("JavaScript file 'script.js' created successfully.")
    else:
        print("Table not found with id 'listado_valores'")
else:
    print("Failed to retrieve the webpage")
