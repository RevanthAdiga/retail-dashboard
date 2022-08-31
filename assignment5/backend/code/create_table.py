from pathlib import Path
import sqlite3
import pandas as pd

Path("data.db").touch()

connection = sqlite3.connect("data.db")
cursor = connection.cursor()

# MUST BE INTEGER
# This is the only place where int vs INTEGER matters—in auto-incrementing columns
create_table = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text,email text, password text)"
cursor.execute(create_table)

create_table = "CREATE TABLE IF NOT EXISTS dataset (id INTEGER, name text, date text, manner_of_death text, armed text, age text, gender text, race text, city text, state text, signs_of_mental_illness text, threat_level text, flee text, body_camera text, arms_category text)"
cursor.execute(create_table)

df = pd.read_csv("../data/shootings.csv")

df.to_sql("dataset", connection, if_exists="replace", index=True)


connection.commit()

connection.close()
