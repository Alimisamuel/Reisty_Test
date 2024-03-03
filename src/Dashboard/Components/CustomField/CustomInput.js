import React from 'react'
import { TextField, InputLabel } from '@mui/material';

const CustomInput = ({name, value, onChange, type, size}) => {
    return (
        <>

            <TextField
                placeholder={name}
                size={size ? size : "small"}
                type={type}
                fullWidth
                value={value}
                onChange={onChange}
                InputProps={{
                    style: {
                        fontFamily: "Gordita",
                        fontSize: "13px",
                        borderRadius: "10px",
                        offset: " 1px solid #ccc",
                        color: "#ccc",
                        fontWeight:400,
                        border: "1px solid #ccc",

                        // Replace with your desired font family
                    },
                }}
            />
        </>
    );
}

export default CustomInput