import React, { useState } from 'react'

const Icon = (props) => {
    
    const [icon, setIcon] = useState("")
    if (props.id >= 200 && props.id <= 299) {
        setIcon("Thunderstorm")
    } else if (props.id >= 300 && props.id <= 399) {
        setIcon("Drizzle")
    } else if (props.id >= 500 && props.id <= 599) {
        setIcon("Rain")
    } else if (props.id >= 600 && props.id <= 699) {
        setIcon("Snow")
    } else if (props.id >= 700 && props.id <= 799) {
        setIcon("Atmosphere")
    } else if (props.id === 800) {
        setIcon("Clear")
    } else {
        setIcon("Clouds")
    }

  return (
    <div>{icon}</div>
  )
}

export default Icon