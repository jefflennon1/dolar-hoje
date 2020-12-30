import React, {useEffect, useState }from 'react';
import api from '../../../services/api'
import './style.css'


export default function PegaDolar(){
  const [ dolar, setDolar] = useState([]);
  const [ euro, setEuro ] = useState([]);

  useEffect(()=>{
    api.get('/all').then((response)=>{
      // response.data -> tem todas as moedas;
      setDolar([response.data.USD])
      setEuro([response.data.EUR])      
     
    })
  }, [])

  return(
    <>
      <div className="divDolar divPadrao">
          <h2>
            {dolar.map(dolar => <div key={dolar.timestamp}>{dolar.name}</div>)}
          </h2>
          <div>  
            <div>
              Valor atual:
              {dolar.map(dolar=> <div key={dolar.timestamp+1 }>{dolar.ask}</div>)}
            </div>
          </div>
      </div>
      
      <div className="divEuro  divPadrao">
          <h2>
            {euro.map(euro => <div key={euro.timestamp}>{euro.name}</div>)}
          </h2>
          <div>
            Valor hoje:
            {euro.map(euro =><div key={euro.timestamp+1}>{euro.ask}</div>)}
          </div>
      </div>
    </>
  )
}