import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id:1,
            title:"Chennai"
        },
        {
            id:2,
            title:"Tokyo"
        },
        {
            id:3,
            title:"Dubai"
        },
        {
            id:4,
            title:"New York"
        },
        {
            id:5,
            title:"London"
        }
        
    ];
  return (<div className="flex items-center justify-around my-6">
      {cities.map((city) => {
        return <button key={city.id} className="text-white text-lg font-medium" onClick={() => setQuery({q: city.title})}>{city.title}</button>
      })}
  </div>
  );
}

export default TopButtons