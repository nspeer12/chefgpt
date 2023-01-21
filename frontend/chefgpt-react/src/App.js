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
    title: "",
    ingredients: [],
    recipe: [],
    done: false
  },
  states: {
    start: {
      on: {
        generate_recipe: {
          target: "ingredients",
          actions: async (context, event) => {
            console.log('Calling Backend to Generate Recipe...')
            const response = await fetch("https://your-api-endpoint.com/recipe");
            const data = await response.json();
            return { ...context, title: data.title, ingredients: data.ingredients, recipe: data.recipe };
          }
        }
      }
    },
    ingredients: {
      on: {
        cook: "recipe",
        checkOffIngredient: {
          actions: assign((context, event) => {
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
