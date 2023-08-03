from flask import Flask, request, jsonify
import model_util
from flask_cors import CORS
app = Flask(__name__)

CORS(app)
cors = CORS(app, resources = {
    r'/recommend': {
        "origins": "*"
    }
})

@app.route('/recommend', methods=['POST'])
def recommend():
    title_json = request.get_json()
    title = title_json['title']
   
    response = jsonify({
        "result": model_util.recommend_items(title)
    })
    response.headers.add('Access-Control-Allow-Origin: ', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)