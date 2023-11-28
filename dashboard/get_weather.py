import requests as rq

def get_weather(city):
    API_KEY = "dd63ffdda0b2fd81b4f350346ca74bc9"
    URL = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "APPID": API_KEY,
        "q": city or "Kolkata",
        "units": "metric"
    }

    result = rq.get(URL,params)
    res = result.json()
    print(f"--------------------------{res}-------------------------")
""" 
    x = self.exception_handling(res)
    self.result["text"] = x """