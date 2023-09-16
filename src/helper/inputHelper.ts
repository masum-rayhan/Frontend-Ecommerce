import React from 'react'

const inputHelper = (event : React.ChangeEvent<HTMLInputElement>, data:any) => {
    const tempData = {...data};
    tempData[event.target.name] = event.target.value;
    return tempData;
}

export default inputHelper 