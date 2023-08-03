from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

pt = pickle.load(open('pt.pkl','rb'))
items = pickle.load(open('items.pkl','rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl','rb'))

app = Flask(__name__)
def recommend_items(item_name):
    # index fetch
    index = np.where(pt.index==item_name)[0][0]
    # gives 4 similar items as 1:5
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:4]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = items[items['Item'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Item')['Item'].values))
        item.extend(list(temp_df.drop_duplicates('Item')['Image'].values))
        item.extend(list(temp_df.drop_duplicates('Item')['Price'].values))

        item_dict = {"title": '', "image": '', "price":''}
        x = list(item_dict.keys())
        for i in range(0, len(x)):
             item_dict[x[i]] = item[i]
        data.append(item_dict)
    return data