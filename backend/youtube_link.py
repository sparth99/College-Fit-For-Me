from youtube_search import YoutubeSearch
import json


def get_youtube_link(query):
    results = YoutubeSearch(query, max_results=1).to_json()
    r = json.loads(results)
    link = "https://www.youtube.com"
    for thing in r["videos"]:
        link = link + thing["link"]
    return link
