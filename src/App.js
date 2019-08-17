import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

function App() {

  // Moneda
  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ cargando, guardarCargando ] = useState(false);
  const [ resultado, guardarResultado ] = useState(false);

  const cotizarCriptomonedas = async () => {

    // Si no hay moneda - no ejecutar la primera vez
    if(moneda === "" || criptomoneda === "") return;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const resultado = await axios.get(url);

    guardarCargando(true);

    // Ocultar spinner y agregar el resultado
    setTimeout(() => {
      guardarCargando(false);
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    }, 3000)
  }

  useEffect(() => {
    cotizarCriptomonedas();
  
  }, [criptomoneda, criptomoneda])

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="Imagen Criptomonedas" className="logotipo" />
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
