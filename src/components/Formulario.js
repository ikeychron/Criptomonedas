import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Formulario({guardarMoneda, guardarCriptomoneda}) {

  //State
  const [ criptomonedas, guardarCriptomonedas ] = useState([]);
  const [ monedaCotizar, guardarMonedaCotizar ] = useState('');
  const [ criptoCotizar, guardarCriptoCotizar ] = useState('');
  const [ error, guardarError ] = useState(false);


  const consultarAPI = async () => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';

    const resultado = await axios.get(url);

    // Colocar respuesta en el State
    guardarCriptomonedas(resultado.data.Data);
  }

  useEffect(() => {
    
    consultarAPI();

  }, [])

  // Validar Form
  const cotizarMoneda = e => {
    e.preventDefault();

    // Validar si ambos campos están llenos
    if(monedaCotizar === '' || criptoCotizar === '') {
      
      guardarError(true);
      return;

    }
    // Pasar los datos al componente principal

    guardarError(false);
    guardarCriptomoneda(criptoCotizar);
    guardarMoneda(monedaCotizar);
  }

  // Mostrar el error en caso de que exista
  const componente = (error) ? <Error mensaje="Ambos campos son obligatorios." /> : null;

  return(
    <form
      onSubmit={cotizarMoneda}
    >
      {componente}
      <div className="row">
        <label>Elige tu Moneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarMonedaCotizar(e.target.value)}
        >
          <option value="">Elige tu Moneda</option>
          <option value="USD">Dolar Estadounidense</option>
          <option value="EUR">Euros</option>
          <option value="MXN">Peso Mexicano</option>
          <option value="GBP">Libras</option>
        </select>
      </div>

      <div className="row">
        <label>Elige tu Criptomoneda</label>
        <select 
          className="u-full-width"
          onChange={e => guardarCriptoCotizar(e.target.value)}
        >
          <option value="">Elige tu Criptomoneda</option>
          {criptomonedas.map(criptomoneda => (
            <Criptomoneda
              key={criptomoneda.CoinInfo.Id} 
              criptomoneda={criptomoneda}
            />
          ))};

        </select>
      </div>
      
      <input type="submit" className="button-primary u-full-width" value="Calcular" />

    </form>
  );

}

export default Formulario;