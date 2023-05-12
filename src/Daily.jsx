import React from 'react'
import './Daily.scss'
import { DateTime } from "luxon";

const Daily = (props) => {
  return (
    <>
    <div className='daily-container'>
    <div className="daily-item">
            <div>{props.data ? "Today" : null}</div>
            <div>{props.data ? Math.round(props.data.daily[0].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 1 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[1].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 2 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[2].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 3 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[3].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 4 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[4].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 5 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[5].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 6 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[6].temp.day) + "°" : null}</div>
        </div>
        <div className="daily-item">
            <div>{props.data ? DateTime.local().plus({ days: 7 }).setZone(props.data.timezone).toFormat("EEE") : null}</div>
            <div>{props.data ? Math.round(props.data.daily[7].temp.day) + "°" : null}</div>
        </div>
    </div>
    </>
  )
}

export default Daily