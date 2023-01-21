import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")



def chefgpt(query):
    prompt = "Generate a recipe including ingredients and instructions given the following meal request:"

    prompt += "\n" + query

    response = openai.Completion.create(
          model="text-davinci-002",
          prompt=prompt,
          temperature=0.3,
          max_tokens=200,
          top_p=1.0,
          frequency_penalty=0.8,
          presence_penalty=0.0
        )

    text_array = response["choices"][0]["text"].split("\n")

    text_array = list(filter(lambda x: x != "", text_array))
    text_array = list(filter(lambda x: x != " ", text_array))
    print(text_array)
    print()

    ingredients_index = text_array.index("Ingredients:")

    if ("Instructions:" in text_array):
        instructions_index = text_array.index("Instructions:")
    elif ("Instructions: " in text_array):
        instructions_index = text_array.index("Instructions: ")
    else:
        print("Couldn't find Instructions:")
        exit()

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

    # for item in ingredients_formated:
    #     print(item)
    # print()

    for index, value in enumerate(instructions_list):
        item = {
            "index" : index+1,
            "value" : value[value.index(".")+2:]
        }
        recipe_formated.append(item)

    # for item in recipe_formated:
    #     print(item)

    response = {
        "ingredients" : ingredients_formated,
        "recipe" : recipe_formated,
        "title" : query
    }

    print(response)


if __name__ == "__main__":

    chefgpt("tacos al carbon")