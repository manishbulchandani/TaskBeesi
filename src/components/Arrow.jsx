import { useEffect, useState } from "react";
import arrow from "/assets/arrow_2.png";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import {motion} from "framer-motion";

const Arrow = (props) => {
  const theme=useTheme();
  const [arrowTop, setArrowTop] = useState(null);
  const [arrowLeft, setArrowLeft] = useState(null);
  const [rotation, setRotation] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (props.index !== props.length) {
      const calculateCenter = (rect1coordinates, rect2coordinates) => {
        const centerX = (rect1coordinates.x + rect2coordinates.x) / 2;
        const centerY = (rect1coordinates.y + rect2coordinates.y) / 2;
        return { x: centerX, y: centerY };
      };

      const calculateRotation = (rect1coordinates, rect2coordinates) => {
        const angle = degrees(
          Math.atan(
            (rect2coordinates.y - rect1coordinates.y) /
              (rect2coordinates.x - rect1coordinates.x)
          )
        );
        return angle;
      };
      const calculateWidth = (rect1coordinates, rect2coordinates,rect1) => {
        const distance = Math.sqrt(
          Math.pow(rect1coordinates.x - rect2coordinates.x, 2) +
            Math.pow(rect1coordinates.y - rect2coordinates.y, 2)
        );
        return distance - rect1.width-20;
      };

      const degrees = (radians) => (radians * 180) / Math.PI;

      const placeImageAtCoordinates = (x, y, a, w) => {
        setArrowLeft(`${x}px`);
        setArrowTop(`${y}px`);
        setRotation(a);
        setWidth(w);
      };

      const handleResize = () => {
        setTimeout(() => {
          const element1 = document.getElementById(`step-${props.index + 0}`);
          const element2 = document.getElementById(`step-${props.index + 1}`);
          const rect1 = element1.getBoundingClientRect();
          const rect2 = element2.getBoundingClientRect();
          const rect1coordinates = {
            x: rect1.left + window.pageXOffset + rect1.width / 2,
            y: rect1.top + window.pageYOffset + rect1.height / 2,
          };
          const rect2coordinates = {
            x: rect2.left + window.pageXOffset + rect2.width / 2,
            y: rect2.top + window.pageYOffset + rect2.height / 2,
          };
          const centerCoordinates = calculateCenter(rect1coordinates, rect2coordinates);
          const rotationAngle = calculateRotation(rect1coordinates, rect2coordinates);
          const width = calculateWidth(rect1coordinates, rect2coordinates,rect1);
          placeImageAtCoordinates(
            centerCoordinates.x,
            centerCoordinates.y,
            rotationAngle,
            width
          );
        },301);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  },[props.index,props.length]);

  return (
    <Box
      sx={{
        position: "absolute",
        display: props.index === props.length ? "none" : "block",
        top: arrowTop,
        left: arrowLeft,
        width: width,
        transform: `translateX(-50%) translateY(-50%) rotate(${rotation}deg)`,
        [theme.breakpoints.down("sm")]:{
          transform:`translateX(-50%) translateY(-50%) rotate(${rotation}deg) scaleX(${props.index%4==2?"-100%":"1"})`
        }
      }}
      > 
      <motion.img
        animate={{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
        initial={{clipPath:"polygon(0 0, 0% 0, 0% 100%, 0 100%)"}}
        transition={{delay:2*(props.index-1)+1.1,duration:1}}
        src={arrow}
        alt=""
        style={{
          width: "100%",
          transform:
          props.index % 4 == 3
              ? "translateY(200%)"
              : "translateY(-100%) scaleY(-100%)",
        }}
      />
    </Box>
  );
};

export default Arrow;
