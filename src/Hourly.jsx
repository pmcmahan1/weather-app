import React from 'react'
import { DateTime } from "luxon";
import './Hourly.scss'

const Hourly = (props) => {
  return (
    <>
    <div className='hourly-container'>
    <div className="hourly-item">
            <div>{props.data ? "Now" : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[0].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 1 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[1].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 2 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[2].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 3 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[3].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 4 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[4].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 5 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[5].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 6 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[6].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 7 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[7].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 8 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[8].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 9 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[9].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 10 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[10].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 11 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[11].temp) + "°" : null}</div>
        </div>
        <div className="hourly-item">
            <div>{props.data ? DateTime.local().plus({ hours: 12 }).setZone(props.data.timezone).toFormat("h:mm a") : null}</div>
            <div>{props.data ? Math.round(props.data.hourly[12].temp) + "°" : null}</div>
        </div>
    </div>
    </>
  )
}

export default Hourly