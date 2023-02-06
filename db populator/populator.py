import boto3
from pprint import pprint
import inquirer
import os


dynamodb = boto3.resource('dynamodb')

tables_files = {"booking_data": "booking_data", "flight_data": "flight_info", "valet_data": "valet_info"}

table_choice = [
    inquirer.List(
        "Table",
        message="Choose table to populate",
        choices = tables_files.values(),
    ),
]

table = inquirer.prompt(table_choice).get("Table")

table = dynamodb.Table(table)
csv_path = "data/csv files/{}.csv".format(tables_files.get(table))


