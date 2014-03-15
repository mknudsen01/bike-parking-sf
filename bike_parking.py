from flask import Flask
import requests
app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/spots", methods=["GET"])
def get_parking_spots():
  spots = obtain_all_spots()
  print spots
  return spots

def obtain_all_spots():
  results = requests.get('https://data.sfgov.org/resource/w969-5mn4.json').json()

  return results




if __name__ == '__main__':
  app.run()