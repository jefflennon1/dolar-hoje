import React, {useEffect, useState }from 'react';
import api from '../../../services/api'
import './style.css';
import euroIcon from '../../assets/icon_euro_circ.png';
import dolarIcon from '../../assets/icon_american_circ.png'


export default function PegaDolar(){
  const [ dolar, setDolar] = useState([]);
  const [ euro, setEuro ] = useState([]);

 

  useEffect(()=>{
        api.get('/usd').then((response)=>{
          setDolar(response.data);
        }),
      api.get('/eur').then((response)=>{
        setEuro(response.data)
      })
  },[]);

  return(
    <>
      <div className="divDolar divPadrao">
        <div className="image">
          <img src={dolarIcon} alt=""/>
        </div>
          <h2>
            {dolar.map(dolar => <div key={dolar.timestamp}>{dolar.name}</div>)}
          </h2>
          <div>  
            <div className="divDoObjeto">
              Valor hoje:
              {dolar.map(dolar=> 
              <div key={dolar.timestamp+1 }>
                <span className="valorNaTelaDolar" value={retonaValorFormatado(dolar)}>
                  {retonaValorFormatado(dolar)}
                </span>
                  <div className="inputDolar  inputs">
                  R$ <input type="text" placeholder="Digite um valor para converter para esta moeda" id="dolarValor" onKeyPress={()=>onlynumber(event,dolar)} />
                  </div>
                </div>)}
            </div>
          </div>
      </div>
      {/*AQUI COMEÇA O EURO  */}
      <div className="divEuro  divPadrao">
         <div className="image">
            <img src={euroIcon} alt=""/>
          </div>
          <h2>
            {euro.map(euro =><div key={euro.timestamp}>
              <span className="valor">
                {euro.name}
              </span>
            </div>)}
          </h2>
          <div className="divDoObjeto">
            Valor hoje:
            {euro.map(euro =>
              <div key={euro.timestamp+1}>
                <span className="valorNaTelaEuro" value={retonaValorFormatado(euro)}>
                   {retonaValorFormatado(euro)}
                </span>
                 <div className="inputEuro  inputs">
                   R$ <input type="text" id="inputEuro"  onKeyPress={()=>onlynumber(event,euro)}
                    placeholder="Digite um valor para converter para esta moeda" onChange={()=>converteEuro(euro)}/>
                 </div>
              </div>)}
          </div>
      </div>
    </>
  )

  function retonaValorFormatado(props){
      var number = Number(props.ask);
      return number.toFixed(2);
  }
  
  
  function onlynumber(evt, props) {
    
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
 }

 function converteEuro(props){
   var euroInput = document.getElementById('inputEuro');
   var inputValor = euroInput.value;
   var converSao = props.ask * euroInput;

  const valorConvertido = document.createElement('span');
  valorConvertido.setAttribute('class','spanTextoConvertido');
  const pegaSpan = document.getElementsByClassName('spanTextoConvertido');
  console.log(pegaSpan)
  
 }

}
