import { Stack } from "@mui/material";
import React from "react";
import Step from "./Step";
import { useTheme } from "@emotion/react";
import {motion} from "framer-motion"
const Large = ({ steps }) => {
  const theme=useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        {steps.map((step, index) => {
          return (
            <motion.div key={index} animate={{opacity:1}} initial={{opacity:0}} transition={{duration:0.6,delay:index*2}} style={{width: `${100 / steps.length}%`,height:"100%"}}>
            <Stack
              alignItems="center"
              sx={{
                height: "100%",
                position: "relative",
                transition:"scale 0.1s linear",
                [theme.breakpoints.down("lg")]:{
                    transform:index==2?`translateX(80px)`:""
                },
                
              }}
            >
              <Step
                key={index}
                icon={step.icon}
                text={step.text}
                stepnum={index + 1}
                stepslen={steps.length}
              />
            </Stack>
            </motion.div>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Large;
