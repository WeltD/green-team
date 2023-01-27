import pandas as pd

data = pd.read_csv('booking_data.csv')


def getDateActivity(date="2022-01-06"):
    dateActivity = pd.DataFrame()
    start = data[data['startdatetime'].str.contains(date)]
    end = data[data['enddatetime'].str.contains(date)]
    dateActivity = pd.concat([dateActivity, start, end])
    return dateActivity