#         "username": "c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix",
#         "password": "88c3d8b489cdf9c0dc0a3fc9fcd9785e08e94304213691512af806f03bb7116c",
#        "host": "c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix.cloudant.com",


#testing the upload of the data
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey

serviceUsername = "c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix"
servicePassword = "88c3d8b489cdf9c0dc0a3fc9fcd9785e08e94304213691512af806f03bb7116c"
serviceURL = "https://c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix.cloudant.com"

client = Cloudant(serviceUsername, servicePassword, url=serviceURL)
client.connect()

#name storage_unit
databaseName = "storage_unit"
myDatabaseDemo = client.create_database(databaseName)


sampleData = [
    ["NAME1", "LOCATION", "BLOOD", 100, "GENDER"]
]
"""
{
  "_id": "6cd906b7a8de079e89fbf1a38d0f6b0d",
  "_rev": "1-756e569c9bfc5707a01e2fa2e86e6558",
  "Name": "None",
  "Location": "None",
  "Blood Type": "None",
  "Age": "0",
  "Gender": "None"
}
"""

for document in sampleData:
    name = document[0]
    location = document[1]
    blood = document[2]
    age = document[3]
    gender = document[4]

    jsonDocument = {
        "Name": name,
        "Location": location,
        "Blood Type": blood,
        "Age": age,
        "Gender": gender
    }

    newDocument = myDatabaseDemo.create_document(jsonDocument)

    if newDocument.exists():
        print("Done")


client.disconnect()
