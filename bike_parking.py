from flask import Flask, render_template
import requests
app = Flask(__name__)

@app.route("/")
def index():
  return render_template('index.html')

@app.route("/spots", methods=["GET"])
def get_parking_spots():
  spots = obtain_all_spots()
  return spots

def obtain_all_spots():
  results = requests.get('https://data.sfgov.org/resource/w969-5mn4.json?status=COMPLETE&$where=spaces>0').json()
  return results

if __name__ == '__main__':
  app.run()