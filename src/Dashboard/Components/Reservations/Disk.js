import { Box, Typography } from '@mui/material'
import React from 'react'

const Disk = ({variant, label, value}) => {
  return (
<>
{
    variant === "square" ? (
<Box sx={{bgcolor:'#fff', p:1, display:'flex', flexDirection:'column', alignItems:'center', width:'55px', height:'55px'}}>
<Typography sx={{fontWeight:500, color:'#000'}}>{label}</Typography>
<Typography sx={{fontWeight:500, color:'#000'}}>{value}</Typography>
</Box>
    ) :(
        <Box sx={{bgcolor:'#fff', p:1, display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'50%', width:'55px', height:'55px'}}>
<Typography sx={{fontWeight:500, color:'#000'}}>{label}</Typography>
<Typography sx={{fontWeight:500, color:'#000'}}>{value}</Typography>
        </Box>
    )
}

</>
  )
}

export default Disk