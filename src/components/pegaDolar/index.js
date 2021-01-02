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
              {dolar.map(dolar=> 
              <div key={dolar.timestamp+1 }>
                    <div className="image">
                      <img src={dolarIcon} alt=""/>
                    </div>
                    <h2> Dólar Americano</h2>
                      <div className="divDoObjeto">
                          <label htmlFor="" className="Valor Hoje">Valor hoje: </label>
                          <label className="valorNaTelaDolar" value={retonaValorFormatado(dolar)}>
                            {retonaValorFormatado(dolar)} $ 
                          </label>
                      <div className="inputDolar  inputs"  id="divInputDolar">
                       <input type="text" placeholder="Digite um valor para converter para esta moeda"
                       id="dolarValor" onKeyPress={()=>onlynumber(event,dolar)} onChange={()=>converteDolar(dolar)}/>
                      </div>
                    </div>
             </div>
                )}
      </div>
      {/*AQUI COMEÇA O EURO  */}
      <div className="divEuro  divPadrao"  id="containerEuro">
          <div className="divDoObjeto" id="divDoObjetoEuro">
                {euro.map(euro =>
                <div key={euro.timestamp+1}>
                    <div className="image">
                      <img src={euroIcon} alt=""/>
                    </div>
                  <h2> Euro </h2>
                  <label htmlFor="" id="valorHoje">Valor Hoje: &nbsp;</label>            
                  <label className="valorNaTelaEuro" value={retonaValorFormatado(euro)}>
                          {retonaValorFormatado(euro)} €
                  </label>
                  <div className="inputEuro  inputs"  id="divInputEuro">
                     <input type="text" id="inputEuro"  onKeyPress={()=>onlynumber(event,euro)}
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
  
  function onlynumber(evt) {
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
          verifcaSeJaExisteConversao();
          var euroInput = document.getElementById('inputEuro');
          var divInput = document.getElementById('divInputEuro')
          var inputValor = euroInput.value;
          var inputValorEuro = props.ask * inputValor;

          const valorConvertido = document.createElement('label');
          valorConvertido.setAttribute('id','labelEuroConvertido');
          valorConvertido.innerText = ' = '+inputValorEuro.toFixed(2).toString().replace(".", ",")+' R$';

          divInput.append(valorConvertido);
    }  
    function converteDolar(props){
         verifcaSeJaExisteConversao();
          var euroInput = document.getElementById('dolarValor');
          var divInput = document.getElementById('divInputDolar')
          var inputValor = euroInput.value;
          var inputValorDolar = props.ask * inputValor;

          const valorConvertido = document.createElement('label');
          valorConvertido.setAttribute('id','labelDolarConvertido');
          valorConvertido.innerText = ' = '+inputValorDolar.toFixed(2).toString().replace(".", ",")+' R$';

          divInput.append(valorConvertido);
    }

    function verifcaSeJaExisteConversao(){
        const pegaLabelEuro = document.getElementById('labelEuroConvertido');
        const pegaLabelDolar = document.getElementById('labelDolarConvertido');
        if(pegaLabelEuro != null){
          pegaLabelEuro.remove();
        }
        if(pegaLabelDolar != null){
          pegaLabelDolar.remove();
        }
    }

}
