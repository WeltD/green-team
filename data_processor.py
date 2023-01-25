import API_pull
import pandas as pd

data = API_pull.getBookingData()['Table1']
df = pd.DataFrame.from_dict(data, orient='columns')
print(df[['startdatetime', 'enddatetime']])

df.loc[df['startdatetime'] == '2022-01-06T04:16:00']