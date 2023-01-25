import requests
import sys

my_headers = {'Ocp-Apim-Subscription-Key': 'f80b381101f842a990b4c94ad783dd59',
                'LogicAppAPIKey' : '7A32B6EED6AAB6B64BFFB8BED0810424',
                'StartDatetime' : '2022-01-05 00:00:00',
                'EndDatetime' : '2022-01-07 00:00:00'}




def getValetParkingMovements(start_datetime, end_datetime):
    
    response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLValetParkingMovements/manual/paths/invoke", headers=my_headers)
    return response.json()

def getBookingData():
    response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLBookingDetail/manual/paths/invoke", headers=my_headers)
    return response.json()

def getFlightSchedule():
    response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLFlightSchedule/manual/paths/invoke", headers=my_headers)
    return response.json()


# Sample Input:
# python3 API_pull.py -b "2022-01-01 00:00:00" "2022-01-05 00:00:00"
if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please enter a command line argument")
        sys.exit(1)
    if len(sys.argv) > 2:
        my_headers['StartDatetime'] = sys.argv[2]
        my_headers['EndDatetime'] = sys.argv[3]
    if sys.argv[1] == "-v":
        getValetParkingMovements()
    elif sys.argv[1] == "-b":
        getBookingData()
    elif sys.argv[1] == "-f":
        getFlightSchedule()