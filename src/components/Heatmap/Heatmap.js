import React, { useLayoutEffect, useEffect, useState } from 'react'
import './Heatmap.css'
import { Container } from "react-bootstrap"
import heatmap from 'heatmapjs'


export const Heatmap = ({
    data,
}) => {

    useEffect(() => {

        let container = document.querySelector('.heatmap-container')

        if (!data)
            return

        data = data.map(dataPoint => ({
            x: 20 + dataPoint.xPercent * container.scrollWidth / 100,
            y: 10 + dataPoint.yPercent * container.scrollHeight / 100,
            ...dataPoint
        }))

        let map = heatmap.create({
            container,
            radius: container.scrollWidth / 5,
            maxOpacity: .4,
            minOpacity: .0,
            blur: 1,
            gradient: {
                '.0': 'rgb(0,255,255)',
                '.2': 'rgb(0,200,200)',
                '.4': 'rgb(0,150,150)',
                '.6': 'rgb(0,100,200)',
                '.8': 'rgb(150,0,250)',
                '1': 'rgb(255,0,0)',
            }
        })


        let maxValue = Math.max(...data.map(d => d.value))
        let minValue = Math.min(...data.map(d => d.value))

        map.setData({
            data,
        }).setDataMin(minValue).setDataMax(maxValue)


        return () => {
            let heatmap = document.querySelector('.heatmap-container canvas')
            if (heatmap) heatmap.remove()
        }
    })


    return (
        <div className="heatmap-component">
            <div className="heatmap-container">

            </div>
        </div >
    )

} 