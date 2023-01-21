import {
  BrowserRouter as Router, json, Route, Routes
} from "react-router-dom";

import {CelebrationPage} from './views/CelebrationPage';
import {CookingPage} from './views/CookingPage';
import {HomePage} from './views/HomePage';

import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const cookingMachine = createMachine({
  id: "chefgpt",
  initial: "start",
  context: {
    prompt: "",
    title: "",
    ingredients: [{"text": "avocado"}, {"text": "tomato"}, {"text": "onion"}, {"text": "garlic"}],
    recipe: [{"index": "1", "text": "make guac"}],
    done: false
  },
  states: {
    start: {
      on: {
        generate_recipe: {
          target: "fetch_recipe"
        }
      }
    },
    fetch_recipe: {
      invoke: {
        src: async (context, event) => {

          const encodedPrompt = encodeURIComponent(event.prompt);
          const apiUrl = `http://127.0.0.1:8000/chef/${encodedPrompt}`;
          // const apiUrl = "http://127.0.0.1:8000/"

          console.log(apiUrl);

          const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          const data = await res.json();

          return data
        },
        onDone: {
          target: "ingredients",
          actions: assign((context, event) => {
            console.log(event);
            return { ...context };
          })
        }
      }
    },
    ingredients: {
      on: {
        cook: "recipe",
        checkOffIngredient: {
          actions: assign((context, event) => {
            console.log(context);
            const updatedIngredients = context.ingredients.map(ingredient => {
              if (ingredient.name === event.ingredient.name) {
                return { ...ingredient, collected: true };
              }
              return ingredient;
            });
            return { ...context, ingredients: updatedIngredients };
          })
        }
      }
    },
    recipe: {
      on: {
        finished_cooking: "done"
      }
    },
    done: {
      on: {
        new_recipe: "start",
        complete: {
          actions: assign((context) => {
            return { ...context, done: true };
          })
        }
      }
    }
  }
});

function App() {
  const [state, send] = useMachine(cookingMachine);
  const { title, ingredients, recipe, done } = state.context;

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage state={state} send={send} />} />
          <Route exact path="/Cook" element={<CookingPage state={state} send={send} title={title} ingredients={ingredients} recipe={recipe} done={done}/>} />
          <Route exact path="/Celebrate" element={<CelebrationPage state={state} send={send} title={title} recipe={recipe} done={done}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
