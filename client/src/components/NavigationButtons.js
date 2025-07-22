import React, { useEffect } from "react";
import SystemBack from "./navigationButtons/SystemBack";
import PostNavBtn from "./navigationButtons/PostNavBtn";
import FormReset from "./navigationButtons/FormReset";
import JsonBack from "./navigationButtons/JsonBack";
import './styles/NavigationButtons.css'

const NavigationButtons = ({ stepData, navButtons }) => {
  return (
    <>
      <div className="navigation-buttons">
        {navButtons.map((button, index) => {
          switch (button.type) {
            case "system_back":
              return <SystemBack key={index} button={button} />;
            case "post_nav_btn":
              return <PostNavBtn key={index} button={button} />;
            case "form_reset":
              return <FormReset key={index} button={button} />;
            case "json_back":
              return <JsonBack key={index} button={button} />;
            default:
              return null;
          }
        })}
      </div>
    </>
  );
};

export default NavigationButtons;
