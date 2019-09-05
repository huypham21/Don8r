#
#
# main() will be run when you invoke this action
#
# @param Cloud Functions actions accept a single parameter, which must be a JSON object.
#
# @return The output of this action, which must be a JSON object.
#
#
import sys
import json

def getItems(dictUse):
    from cloudant.client import Cloudant
    from cloudant.error import CloudantException
    from cloudant.result import Result, ResultByKey
    import json
    returningList = []
    numberList = []

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
        if(doc["doc"]["Blood Type"] == dictUse["Blood Type"] and (doc["doc"]["Location"]).lower() == dictUse["Location"].lower()):
            returningList.append(doc["doc"]["Name"])
            numberList.append(doc["doc"]["Number"])
                

    client.disconnect()
    returnString = ""
    for i in range (len(returningList)):
        if(i == len(returningList) - 1):
            returnString += returningList[i]
        else:
            returnString += returningList[i] + ', '
    return returnString, numberList

def main(jsonFile):
    dict = {}
    temp = jsonFile["Blood Type"]
    dict["Blood Type"] = temp
    temp = jsonFile["Location"]
    dict["Location"] = temp
    
    strTemp, numberList = getItems(dict)
    return  {   'message': strTemp, 
                'NumberList': numberList
            }
