import requests
import sys
import pandas as pd

my_headers = {'Ocp-Apim-Subscription-Key': 'f80b381101f842a990b4c94ad783dd59',
                'LogicAppAPIKey' : '7A32B6EED6AAB6B64BFFB8BED0810424',
                'StartDatetime' : '2022-01-01 00:00:00',
                'EndDatetime' : '2023-01-01 00:00:00'}

dates = ["2022-01-01 00:00:00", "2022-02-01 00:00:00", "2022-03-01 00:00:00", "2022-04-01 00:00:00", "2022-05-01 00:00:00"
         , "2022-06-01 00:00:00", "2022-07-01 00:00:00", "2022-08-01 00:00:00", "2022-09-01 00:00:00", "2022-10-01 00:00:00"
         , "2022-11-01 00:00:00", "2022-12-01 00:00:00", "2023-01-01 00:00:00"]




def getValetParkingMovements(start_datetime, end_datetime):
    my_headers['StartDatetime'] = start_datetime
    my_headers['EndDatetime'] = end_datetime
    response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLValetParkingMovements/manual/paths/invoke", headers=my_headers)
    try:
        data = response.json()['Table1']
    except:
        print(response.json())
    df = pd.DataFrame.from_dict(data, orient='columns')

    return df

# def getBookingData():
#     bookingData = pd.DataFrame()
#     for i in range(1, 13):
#         my_headers['StartDatetime'] = dates[i-1]
#         my_headers['EndDatetime'] = dates[i]
#         response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLBookingDetail/manual/paths/invoke", headers=my_headers)
#         data = response.json()['Table1']
#         df = pd.DataFrame.from_dict(data, orient='columns')
#         bookingData = pd.concat([bookingData, df])
#     df.to_csv('booking_data.csv', index=False, mode='a', header=False)
#     # data = response.json()['Table1']
#     # df = pd.DataFrame.from_dict(data, orient='columns')
#     # df.to_csv('booking_data.csv', index=False)

def getBookingData(start_datetime, end_datetime):
    my_headers['StartDatetime'] = start_datetime
    my_headers['EndDatetime'] = end_datetime
    response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLBookingDetail/manual/paths/invoke", headers=my_headers)
    try:
        data = response.json()['Table1']
    except:
        print(response.json())
    df = pd.DataFrame.from_dict(data, orient='columns')

    return df


def getFlightSchedule(start_datetime, end_datetime):
    my_headers['StartDatetime'] = start_datetime
    my_headers['EndDatetime'] = end_datetime
    response = requests.get("https://bristolairportdwhapi.azure-api.net/GetKCLFlightSchedule/manual/paths/invoke", headers=my_headers)
    try:
        data = response.json()['Table1']
    except:
        print(response.json())
    df = pd.DataFrame.from_dict(data, orient='columns')

    return df

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