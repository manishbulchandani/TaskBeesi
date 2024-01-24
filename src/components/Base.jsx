import { Stack } from '@mui/material'
import React from 'react'
import Step from './Step'
import {motion} from "framer-motion"
const Base = (props) => {
  return (
    <Stack>
        {props.steps.map((step,index)=>{
            return(
                <motion.div key={index} animate={{opacity:1}} initial={{opacity:0}} transition={{duration:0.6,delay:index*2}}>
                <Stack alignItems={index%2==0?"flex-start":"flex-end"} sx={{height:"275px",width:"100vw",maxWidth:"600px"}}>
                    <Step stepnum={index+1} stepslen={props.steps.length} icon={step.icon} text={step.text}/>
                </Stack>
                </motion.div>
            )
        })}
    </Stack>
  )
}

export default Base
