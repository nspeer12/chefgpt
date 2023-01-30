import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Checkbox, Space, Steps, Typography } from "antd";
import PromptContext from "./HomePage";
import ContextProvider from "./HomePage"
import { ChildWithConsumer } from "./HomePage";
import HomePage from "./HomePage";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const { Title } = Typography;

const RecipeTitle = {};
const contextData = JSON.parse(sessionStorage.getItem("contextData"));




const ingredients = contextData.ingredients;
const recipe = contextData.recipe;



export function CookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCookingPage, setIsCookingPage] = useState(false);
  const [reload, setReload] = useState(0);
  const prompt = contextData.title;

  useEffect(() => {
    forceReload();
  });

  return (
    <div style={wrapperDiv}>
      <div style={title}>
        <Title style={titleStyle}>
        {contextData.title}
        </Title>
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
            style={steps}
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
            <Button style={prevButton} onClick={previousStep}>
              Previous Step
            </Button>
            <Button style={nextButton} onClick={nextStep} type="primary">
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
              <Checkbox style={checkBoxText} onChange={onChange}>
                {item.text}
              </Checkbox>
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
  function forceReload() {
    if (reload == 0) {
      window.location.reload(false);
      setReload(1);
    }
  
  }
}


// const container = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
// };

/* const ChildWithConsumer = () => (
  <PromptContext.Consumer>
    {(prompt) => (
      <h1>The context says "{prompt}"</h1>
    )}
  </PromptContext.Consumer>
); */

const RecipeContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: " 50vw",
  height: "70vh",
};

const steps = {
  color: "white",
  fontSize: "24px",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const ingredientCheckBox = {
  paddingBottom: "10px",
};

const checkBoxText = {
  color: "black",
  fontSize: "24px",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const title = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10vh",
};

const titleStyle = {
  color: "black",
  fontFamily: "'Trebuchet MS', sans-serif",
  fontSize: "54px",
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

const wrapperDiv = {
  backgroundImage: "linear-gradient(to top right, #FF9505, #4E4187)",
  height: "100vh",
};

const prevButton = {
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

const nextButton = {
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

export default CookingPage;
