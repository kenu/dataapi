from flask import Flask, render_template
import http.client
import json

app = Flask(__name__)

@app.route('/')
def index():
    # API 호출 및 데이터 처리
    data = get_api_data()
    return render_template('index.html', data=data)

def get_api_data():
    conn = http.client.HTTPSConnection("apis.data.go.kr")
    headers = {"Content-type": "application/json"}

    params = "/1230000/BidPublicInfoService04/getBidPblancListEvaluationIndstrytyMfrcInfo01?serviceKey=4MjolsmxrlqEv3hEBeSleWCFNguNi2rJoQBKD9xtry0x4uqqnpUcOJinPQt9Q0ASv%2Funl57K%2BVb5QjHvjDLAuQ%3D%3D&numOfRows=640&pageNo=1&type=json&inqryDiv=1&inqryBgnDt=202406010000&inqryEndDt=202406302359"

    conn.request("GET", params, headers=headers)

    res = conn.getresponse()
    data = res.read().decode("utf-8")

    return json.loads(data)

if __name__ == '__main__':
    app.run(debug=True)
