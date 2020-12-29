import React, {useEffect, useState }from 'react';
import api from '../../../services/api'

export default function PegaDolar(){
  const [infoDolar, setInfoDolar ] = useState([])

  useEffect(()=>{
    api.get('/usd').then((response)=>{
      console.log(response.data[0]);
      // setInfoDolar([response.data])
    })
  , []})

  return(
    <>
      {infoDolar.map( info => <h1 key={info.timestamp}>{info.codes}</h1>)}
    </>
  )
}