import { Stack, Typography, useMediaQuery } from "@mui/material";
import stepIcon1 from "/assets/step_1.png";
import stepIcon2 from "/assets/step_2.png";
import stepIcon3 from "/assets/step_3.png";
import stepIcon4 from "/assets/step_4.png";
import Arrow from "./Arrow";
import { useTheme } from "@emotion/react";
import Base from "./Base";
import Large from "./Large";

function Home() {
  const theme = useTheme();
  const steps = [
    {
      icon: stepIcon1,
      text: "Set your goal",
    },
    {
      icon: stepIcon2,
      text: "Create or Join Group",
    },
    {
      icon: stepIcon3,
      text: "Pay amount on time",
    },
    {
      icon: stepIcon4,
      text: "Earn Rewards",
    },
    
    
    
    
  ];

  return (
    <Stack
      alignItems="center"
      padding="1rem"
      sx={{ height: "90vh", position: "relative" }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "600",
          fontSize: "3.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "2rem",
          },
          [theme.breakpoints.down("lg")]: {
            fontSize: "3rem",
          },
        }}
      >
        HOW IT WORKS
      </Typography>
      {useMediaQuery(theme.breakpoints.down("sm")) ? (
        <>
          <Base steps={steps} />
          {steps.map((_, index) => {
            return (
              <Arrow
                key={index}
                index={index + 1}
                length={steps.length}
              />
            );
          })}
        </>
      ) : (
        <>
          <Large steps={steps} />
          {steps.map((_, index) => {
            return (
              <Arrow
                key={index}
                index={index + 1}
                length={steps.length}
              />
            );
          })}
        </>
      )}
    </Stack>
  );
}

export default Home;
