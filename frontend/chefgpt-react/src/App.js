import {
  BrowserRouter as Router, Route, Routes
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

          const data = await res.json().then((data) => { 
            const title = data.data.title;
            const ingredients = data.data.ingredients;
            const recipe = data.data.recipe;
            
            return { title, ingredients, recipe} });

          return data;

          // const title = data.title;
          // const ingredients = data.ingredients;
          // const recipe = data.recipe;

          // console.log("NEW DATA:", title, ingredients, recipe)
          // return { ...context, title, ingredients, recipe };
        },
        onDone: {
          target: "ingredients",
          actions: assign((context, event) => {
            // reassign the context with the new data
            // assign the new data to the context
            console.log("EVENT:", event);

            // go to cook page
            window.location.href = "/Cook";

            
            return { ...context, ingredients: event.data.ingredients, recipe: event.data.recipe, title: event.data.title};
          })
        }
      }
    },
    ingredients: {
      on: {
        cook: "recipe"
      }
    },
    recipe: {
      on: {
        finished_cooking: "done"
      }
    },
    done: {
      on: {
        new_recipe: "start"
      }
    }
  }
});


function App() {
  const [state, send] = useMachine(cookingMachine);
  const { title, ingredients, recipe, done } = state.context;

  console.log(state.ingredients);

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
