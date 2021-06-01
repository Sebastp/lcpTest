import React, { useState, useEffect } from 'react'
import Topbar from '@viewsComp/Topbar'
import MapComponent from '@viewsComp/MapComponent'

const { MYAPI_URL } = process.env

const Home = () => {
  const [fetchedData, fetchedDataSet] = useState([]),
    [pickedOption, pickedOptionSet] = useState(0)
  const avaliableFilterOpitions = [
    { name: '0-250', min: 0, max: 250 },
    { name: '250-500', min: 250, max: 500 },
    { name: '500-1000', min: 500, max: 1000 },
    { name: '1000+', min: 1000 },
  ]

  useEffect(() => {
    fetch(MYAPI_URL + '/state')
      .then(response => response.json())
      .then(data => fetchedDataSet(data))
  }, [])

  useEffect(() => {
    const filterMin = avaliableFilterOpitions[pickedOption].min,
      filterMax = avaliableFilterOpitions[pickedOption].max

    const selectedStates = fetchedData.filter(elem => {
      if (typeof filterMax == 'undefined') {
        return elem.visits > filterMin
      } else {
        return elem.visits >= filterMin && elem.visits <= filterMax
      }
    })

    selectedStates.forEach(elem => {
      const selectedStateSvgElem = document.getElementsByClassName(
        elem.id.toLowerCase()
      )[0]
      if (selectedStateSvgElem) {
        selectedStateSvgElem.setAttribute('fill', '#0D7EF9')
      }
    })
  }, [fetchedData, pickedOption])

  return (
    <div id="indexPage">
      <Topbar />
      <div className="mapCont">
        <h1>User visits</h1>
        <div className="select-wrapper">
          <select
            value={pickedOption}
            onChange={e => pickedOptionSet(parseInt(e.target.value))}
          >
            {avaliableFilterOpitions.map((elem, i) => (
              <option value={i}>{elem.name}</option>
            ))}
          </select>
        </div>
      </div>
      <MapComponent key={avaliableFilterOpitions[pickedOption].name} />
    </div>
  )
}

export default Home
