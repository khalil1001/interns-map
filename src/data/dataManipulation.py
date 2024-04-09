import pandas as pd
import json
import requests

# Reading Excel file
xl = pd.ExcelFile('src/data/history.xlsx')

internships = []

for dest in xl.sheet_names[:4]:
    df = pd.read_excel(xl,sheet_name=dest)
    for company in df.columns[2:]:
        for index, row in df.iterrows():
            student_name = row[company]
            if pd.notnull(student_name):
                # Extract year and term from the 'Host Company' column

                year_term = row[df.columns[0]].split(' ')[-2:]  # Splits the string and takes the last two elements
                year = year_term[1]
                term = year_term[0].capitalize()  # Ensure capitalization is consistent
                
                # Append a dictionary for each internship
                internships.append({
                    'Year': year,
                    'Term': term,
                    'Destination': dest,
                    'Student': student_name,  # Assuming you only want the first name
                    'Company': company
                })

# for intern in internships:
#     print(intern)


f = open('src/data/data.json', 'w')
json.dump(internships, f)
f.close()

def get_company_location(address):
    # Your Google Maps Geocoding API key
    API_KEY = 'AIzaSyCont9_diAfEsy8UGd0YP16aOqbO3wV07U'
    base_url = "https://maps.googleapis.com/maps/api/geocode/json?"

    # Make a request to the Google Maps API
    response = requests.get(f"{base_url}address={address}&key={API_KEY}")
    result = response.json()

    if result["status"] == "OK":
        # Extract latitude and longitude
        latitude = result["results"][0]["geometry"]["location"]["lat"]
        longitude = result["results"][0]["geometry"]["location"]["lng"]
        return latitude, longitude
    else:
        return "Location not found"

# Example usage
address = "275 Post St, San Francisco, California 94108, US"
location = get_company_location(address)
print(location)
