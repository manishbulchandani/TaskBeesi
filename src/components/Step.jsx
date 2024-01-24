import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const Step = (props) => {
  const theme = useTheme();
  const [position, setPosition] = useState(null);
  const stepRef=useRef()
  const getPosition = (stepnum) => {
    if (stepnum == 1) {
      return 0;
    }
    if (stepnum % 2 == 0) {
      return getPosition(stepnum - 1) + 60;
    }
    else {
      return (getPosition(stepnum - 1) + getPosition(stepnum - 2)) / 2;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition(getPosition(props.stepnum));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Button
      variant="contained"
      id={`step-${props.stepnum}`}
      sx={{
        position: "absolute",
        width: "200px",
        height: "200px",
        zIndex: "99",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        // border: "5px solid transparent",
        cursor:"pointer",
        bgcolor: theme.palette.primary.main,
        backgroundSize:"200%",
        borderRadius: "50%",
        color: "#ffffff",
        transition:"all 0.3s ease",
        [theme.breakpoints.up("sm")]: {
          bottom: `${position}%`,
          transform: `translateY(${position}%)`,
        },
        [theme.breakpoints.down("lg")]: {
          transform: `translateY(${props.stepnum % 4 == 0 ? "70" : position}%)`,
          scale: "0.75",
        },
        [theme.breakpoints.down("sm")]: {
          scale: "0.9",
          transform: `none`,
        },
        "&:hover":{
          scale:"1.03",
          boxShadow:"0 0 30px #aeaeae",
        }

      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "50%", position: "relative" }}
      >
        <motion.img
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{
            type: "spring",
            delay: 0.5 + (props.stepnum - 1) * 2,
            bounce: 0.6,
          }}
          style={{ width: "50px", position: "absolute", top: "40%" }}
          src={props.icon}
          alt={`Step-${props.stepnum}`}
        />
      </Stack>
      <Stack alignItems="center" sx={{ margin: "0 30px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + (props.stepnum - 1) * 2.1 }}
        >
          <Typography fontSize="18px">STEP {props.stepnum}:</Typography>
        </motion.div>
        <motion.div
          animate={{ transform: "translateY(0px)", opacity: 1 }}
          initial={{ transform: "translateY(20px)", opacity: 0 }}
          transition={{ delay: 0.8 +(props.stepnum - 1) * 2.1 }}
        >
          <Typography
            fontSize="16px"
            lineHeight={"normal"}
            textAlign={"center"}
          >
            {props.text}
          </Typography>
        </motion.div>
      </Stack>
    </Button>
  );
};

export default Step;
