//import { time } from "console";
import { renderCloseIcon } from "antd/es/modal/PurePanel";
import React, { createContext, useContext, useState, useEffect } from "react";
import { send } from "xstate/lib/actions";
import { useNavigate, Link } from "react-router-dom";

export const PromptContext = createContext("");
//window.location.reload("false");

export function HomePage({ state, context, send }) {
  const [buttonClicked, setButtonClicked] = useState(false);


  return (
    <div style={wrapperDiv}>
      <h3 style={brandName}>ChefGPT</h3>
      <div style={promptDiv}>
        <h4 style={titleText}>How do I cook...</h4>
        <input
          contentEditable="true"
          style={textInput}
          label="How to Cook"
          id="prompt"
          //onChange={changeContext}
        />
        <h4 style={titleText}>?</h4>
      </div>
      <button style={submitButton} onClick={generateRecipe}>
        Generate Recipe
      </button>

      {buttonClicked ? 
      <span>
        <GetRecipe />
        <GoToCook />
      </span> : 
      <p>Not clicked yet</p>}
    </div>
  );

  /*function changeContext() {
    return (
      <ContextProvider/>
    )
  }*/
  function handleClick() {
    window.location.href = "/Cook";
  }

  function generateRecipe() {
    //const nav = useNavigate();
    //window.location.reload("false");

    setButtonClicked(true);
    console.log("Generating recipe...");

    //const prompt = React.createContext({ prompt });
    const prompt = document.getElementById("prompt").value;
    console.log("prompt", prompt);
    send("generate_recipe", { prompt });

    return <GetRecipe />;
  }
}

const GetRecipe = () => {
  const [data, setData] = useState(null);
  const promptLink = "http://localhost:8000/";
  const prompt = document.getElementById("prompt").value;


  useEffect(() => {
    fetch(`http://localhost:8000/chef/${prompt}`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
  }})

      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("contextData", JSON.stringify({ title: data.data.title, ingredients: data.data.ingredients, recipe: data.data.recipe }));
        //HERE
        setData(data)
        return data;
      });
  }, [prompt]);
}

const GoToCook = () => {
  const sendPrompt = document.getElementById("prompt").value;
  //sessionStorage.setItem("contextData", JSON.stringify({ value: sendPrompt }));

  return (
    <span>
      <ContextProvider />
      <Link to="/Cook">Test link</Link>
    </span>
  );
};


export const ContextProvider = () => (
  <PromptContext.Provider value={document.getElementById("prompt").value}>
    <ChildWithConsumer />
  </PromptContext.Provider>
);

export const ChildWithConsumer = () => (
  <PromptContext.Consumer>
    {(prompt) => <h1>The context says "{prompt}"</h1>}
  </PromptContext.Consumer>
);

const wrapperDiv = {
  backgroundImage: "linear-gradient(to top right, #FF9505, #4E4187)",
  display: "grid",
  columnGap: "10px",
  placeItems: "center",
  height: "100vh",
};

const brandName = {
  position: "absolute",
  top: "0%",
  left: "0%",
  color: "black",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const promptDiv = {
  display: "inline-block",
  width: "90vh",
};

const titleText = {
  color: "black",
  //transform: "translate(-50%, -50%)",
  fontSize: "54px",
  display: "inline-block",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const submitButton = {
  border: "none",
  background: "none",
  color: "black",
  fontSize: "24px",
  textDecoration: "none",
  borderRadius: "15px",
  cursor: "pointer",
  padding: "0%",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const textInput = {
  border: "none",
  background: "none",
  borderBottom: "2px solid black",
  fontSize: "54px",
  color: "black",
  display: "inline-block",
  width: "40%",
  fontFamily: "'Trebuchet MS', sans-serif",
  placeholderTextColor: "black",
  outline: "none",
};

//export default {  };

export default HomePage;
