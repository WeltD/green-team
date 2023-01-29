import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

data = pd.read_csv('booking_data.csv')

def getDateActivity(date="2022-01-06"):
    dateActivity = pd.DataFrame()
    start = data[data['startdatetime'].str.contains(date)]
    end = data[data['enddatetime'].str.contains(date)]
    dateActivity = pd.concat([dateActivity, start, end])
    return dateActivity

def dateFlow(date="2022-08-06"):
    dateActivity = getDateActivity(date)
    inFlow = dateActivity['startdatetime'].str.contains(date).sum()
    outFlow = dateActivity['enddatetime'].str.contains(date).sum()
    print("Inflow: ", inFlow, " Outflow: ", outFlow)
    totalFlow = inFlow - outFlow    
    print("Total Flow: ", totalFlow)
    return inFlow, outFlow, totalFlow

def getTotalFlow():
    # Go thorugh each day in the year and apply the dateFlow function
    flows = pd.DataFrame()
    for i in range(1, 366):
        date = pd.to_datetime('2022-01-01') + pd.to_timedelta(i, unit='d')
        info = dateFlow(str(date.date()))
        flows = flows.append(pd.DataFrame([info], columns=['inflow', 'outflow', 'totalflow'], index=[date.date()]))
    return flows


def stayDuration():
    data['duration'] = pd.to_datetime(data['enddatetime']) - pd.to_datetime(data['startdatetime'])
    data['duration'].astype('timedelta64[h]')
    (data['duration'] / pd.Timedelta(hours=1)).hist(bins=range(50, 120, 1))
    plt.xlabel('Legnth of Stay (hours)')
    plt.ylabel('Frequency');
    print(data['duration'].mean())


def plotFlows():
    flow = getTotalFlow()
    flow.plot(kind='bar', y=['outflow', 'inflow'], stacked=True)
    flow['totalflow'].plot(kind='line', color='red', ax=plt.gca())
    plt.title('Total Flow')
    plt.show()

    flow.plot(kind='bar', y='totalflow', color='red')
    plt.title('Total Flow')
    plt.show()

    print("Mean: ", flow['totalflow'].mean())
