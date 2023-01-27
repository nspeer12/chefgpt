from typing import Union
from fastapi import FastAPI
import os
from dotenv import load_dotenv
import openai
import json
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from fastapi.middleware.cors import CORSMiddleware

origins = ["http://localhost:3000", "http://localhost:8000", "http://localhost:5000"]
app = FastAPI(headers={"Access-Control-Allow-Origin": "*"})
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/chef/{query}")
def chefgpt(query: str):
    prompt = "Generate a recipe including ingredients and instructions given the following meal request:"

    prompt += "\n" + query

    valid_response = False

    while (not valid_response): 

        response = openai.Completion.create(
            model="text-davinci-002",
            prompt=prompt,
            temperature=0.3,
            max_tokens=1000,
            top_p=1.0,
            frequency_penalty=0.8,
            presence_penalty=0.0
            )

        if ("Ingredients:" in response["choices"][0]["text"]):
            valid_response = True
        

    text_array = response["choices"][0]["text"].split("\n")

    text_array = list(filter(lambda x: x != "", text_array))
    text_array = list(filter(lambda x: x != " ", text_array))
    text_array = list(filter(lambda x: x != "-", text_array))

    print(text_array)
    print()

    ingredients_index = text_array.index("Ingredients:")

    if ("Instructions:" in text_array):
        instructions_index = text_array.index("Instructions:")
    elif ("Instructions: " in text_array):
        instructions_index = text_array.index("Instructions: ")
    else:
        print("Couldn't find Instructions:")
        return json.dumps({"error" : "Couldn't find Instructions:"})

    ingredients_list = text_array[ingredients_index+1:instructions_index]
    instructions_list = text_array[instructions_index+1:]

    ingredients_formated = []
    recipe_formated = []

    print(ingredients_list)
    print()

    for index, value in enumerate(ingredients_list):
        amount = value[:value.index(" ")]
        ingredients = value[value.index(" ")+1:]
        item = {
            "text" : value
            }
        ingredients_formated.append(item)


    for index, value in enumerate(instructions_list):
        item = {
            "index" : index+1,
            "text" : value[value.index(".")+2:]
        }
        recipe_formated.append(item)

    # for item in recipe_formated:
    #     print(item)

    data = {
        "title" : query,
        "ingredients" : ingredients_formated,
        "recipe" : recipe_formated
    }
    

    # data = {
    #     "title" : "food",
    #     "ingredients" : [{"text" : "1 cup of water"}],
    #     "recipe" : [{"index" : 1, "text" : "Boil water"}]
    # }


    return JSONResponse(status_code=200, content={"data": data})

@app.get("/")
def read_root():
    return JSONResponse(status_code=200, content={"message": "Hello World"})