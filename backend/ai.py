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
          max_tokens=120,
          top_p=1.0,
          frequency_penalty=0.8,
          presence_penalty=0.0
        )

    print(response)
        


if __name__ == "__main__":

    chefgpt("tacos al carbon")