import React, { useState, useEffect } from 'react'
import MapComponent from '@viewsComp/MapComponent'
const { MYAPI_URL } = process.env

const Home = () => {
  const [pickedOption, pickedOptionSet] = useState(0)
  const avaliableFilterOpitions = [
    { name: '0-250' },
    { name: '250-500' },
    { name: '500-1000' },
    { name: '1000+' },
  ]

  useEffect(() => {
    fetch(MYAPI_URL + '/state')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
  return (
    <div id="indexPage">
      <select
        value={pickedOption}
        onChange={e => pickedOptionSet(parseInt(e.target.value))}
      >
        {avaliableFilterOpitions.map((elem, i) => (
          <option value={i}>{elem.name}</option>
        ))}
      </select>
      <MapComponent />
    </div>
  )
}

export default Home
