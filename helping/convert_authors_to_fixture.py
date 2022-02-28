import os
import codecs

# with os.open('authors.txt', 'o') as f:

f = codecs.open('authors.txt', 'r', 'utf-8')

counter = 1
authors = []
for x in f:
    # print(x, end='')
    splitted = x.split(' ')
    # print(f"splitted: {splitted}")
    first_name = splitted[0]
    last_name = splitted[1:]
    if type(last_name) == list:
        last_name_new = ""
        for el in last_name:
            last_name_new += f" {el}" 
    # print(f"first_name: {first_name}, last_name: {last_name_new}")
    # if '\r' in last_name_new:
    #     print("jest hehe")
    #     last_name_new = 
    authors.append({'first_name' : first_name.strip(), 'last_name' : last_name_new.strip()})

# print(authors)

output = []
for author in authors:
    one_fixture = {
        "model" : "books.author",
        "pk": counter,
        "fields" : {
            "first_name" : author['first_name'],
            "last_name" : author['last_name'],
        }
    }
    output.append(one_fixture)
    counter +=1 
print(output)

    
#     all = f"""
# [
#   {
#     "model": "books.author",
#     "pk": counter,
#     "fields": {
#       "first_name": "John",
#       "last_name": "Lennon"
#     }
#   }
# ]
#     """

    # counter += 1
f.close()




# [
#   {
#     "model": "books.author",
#     "pk": 1,
#     "fields": {
#       "first_name": "John",
#       "last_name": "Lennon"
#     }
#   }

# ]
