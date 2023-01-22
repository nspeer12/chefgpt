import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Checkbox, Space, Steps, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const RecipeTitle = "Steak Tacos";

const recipe = [{"index":1,"text":"Preheat oven to 375 degrees."},{"index":2,"text":"Arrange taco shells on a baking sheet."},{"index":3,"text":"Fill each taco shell with chicken, salsa, and cheese."},{"index":4,"text":"Bake in preheated oven for 10 minutes until cheese is melted and bubbly. "},{"index":5,"text":"Serve with optional toppings as desired. Enjoy!"}];

const ingredients = [{"text":"-1 lb. chicken, cooked and shredded"},{"text":"-1 package of taco shells"},{"text":"-1/2 cup salsa"},{"text":"-1/2 cup cheddar cheese, shredded"},{"text":"-lettuce, diced tomatoes, and sour cream (optional toppings)"}];

export function CookingPage() {

  // const { state, send, title, ingredients, recipe, done } = props;

  // console.log(state, send, title, ingredients, recipe, done, title);

  const [currentStep, setCurrentStep] = useState(1);
  const [isCookingPage, setIsCookingPage] = useState(false);

  return (
    <div>
      <div style={titlestyle}>
        <Title>{RecipeTitle}</Title>
      </div>
      <div style={row}>
        <LeftOutlined onClick={handleLeftClick}>Cooking</LeftOutlined>

        {isCookingPage ? <RecipeComponent /> : <IngredientsComponent />}

        <RightOutlined onClick={handleRightClick}>Ingredients</RightOutlined>
      </div>
    </div>
  );

  // Move the component to a separate function
  function RecipeComponent(props) {
    return (
      <>
        <div style={RecipeContainer}>
          <Steps
            direction="vertical"
            current={currentStep - 1}
            items={recipe.map((item, index) => ({
              title:
                index === currentStep - 1
                  ? "In Progress"
                  : index > currentStep - 1
                  ? "Waiting"
                  : "Finished",
              description: item.text,
            }))}
          />
          <Space align="center">
            <Button onClick={previousStep}>Previous Step</Button>
            <Button onClick={nextStep} type="primary">
              {currentStep < recipe.length + 1 ? "Next Step" : "Finish"}
            </Button>
          </Space>
        </div>
      </>
    );
  }

  // Move the component to a separate function
  function IngredientsComponent(props) {
    return (
      <div style={IngredientsContainer}>
        {ingredients.map((item, index) => {
          return (
            <div style={ingredientCheckBox} key={index}>
              <Checkbox onChange={onChange}>{item.text}</Checkbox>
            </div>
          );
        })}
      </div>
    );
  }
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  function goToCelebrationPage() {
    window.location.href = "/Celebrate";
  }
  function goToHomePage() {
    window.location.href = "/";
  }
  function nextStep() {
    if (currentStep > recipe.length) {
      goToCelebrationPage();
    }
    setCurrentStep(currentStep + 1);
  }
  function previousStep() {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  }

  function handleLeftClick() {
    if (isCookingPage === true) {
      // go to ingredients page
      setIsCookingPage(false);
    } else {
      // go back to home page
      goToHomePage();
    }
  }
  function handleRightClick() {
    if (isCookingPage === true) {
      // go back to completed page
      goToCelebrationPage();
    } else {
      // go to cooking page
      setIsCookingPage(true);
    }
  }
}

// const container = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
// };

const RecipeContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: " 50vw",
  height: "70vh",
};

const ingredientCheckBox = {
  paddingBottom: "10px",
};

const titlestyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10vh",
};

const IngredientsContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",

  width: " 50vw",
};

const row = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "70vh",
};

export default CookingPage;
