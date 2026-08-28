import json


sampleJson = """{
   "company": {
      "employee": {
         "name": "doctor",
         "payable": {
            "salary": 7000,
            "bonus": 500
         }
      }
   }
}"""


data = json.loads(sampleJson)

salary = data["company"]["employee"]["payable"]["salary"]

print("Salary:", salary)

data["company"]["employee"]["birth_date"] = "1995-10-15"

with open("doctor.json", "w") as file:
    json.dump(data, file, indent=4)


print("Doctor JSON has been saved to doctor.json")