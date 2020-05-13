import requests
import random


def get_image_search(query):
    r = requests.get(
        "https://api.qwant.com/api/search/web",
        params={
            "count": 10,
            "q": query,
            "t": "web",
            "safesearch": 1,
            "locale": "en_US",
            "uiv": 4,
        },
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
    )

    response = r.json().get("data").get("result").get("items")
    res = []
    for r in response:
        res.append(r["desc"])

    string = res[0]
    res_index = string.rfind(". ")
    if res_index != -1:
        return string[0 : res_index + 1]
    else:
        return string


from models import City, University
from models import db

# for row in City.query.all():
#     if row.wiki_text is None:
#         row.wiki_text = get_image_search(str(row.city_name) + " " + (row.state_name) + " wikipedia")
#         print(row.wiki_text)
#         db.session.commit()

for row in University.query.all():
    if row.wiki_text is None:
        row.wiki_text = get_image_search(str(row.name) + " wikipedia")
        print(row.wiki_text)
        db.session.commit()
