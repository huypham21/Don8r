#         "username": "c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix",
#         "password": "88c3d8b489cdf9c0dc0a3fc9fcd9785e08e94304213691512af806f03bb7116c",
#        "host": "c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix.cloudant.com",


#testing the upload of the data
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
import json

serviceUsername = "c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix"
servicePassword = "88c3d8b489cdf9c0dc0a3fc9fcd9785e08e94304213691512af806f03bb7116c"
serviceURL = "https://c2c7ebdf-134b-4f53-9805-d37f520c6933-bluemix.cloudant.com"

client = Cloudant(serviceUsername, servicePassword, url=serviceURL)
client.connect()

#name storage_unit
databaseName = "storage_unit"
myDatabaseDemo = client.create_database(databaseName)


result_collection = Result(myDatabaseDemo.all_docs, include_docs=True)
for doc in result_collection:
    print json.dumps(doc["doc"]["Age"], indent=4, sort_keys=True)
    print("----------------------------------------")

client.disconnect()
