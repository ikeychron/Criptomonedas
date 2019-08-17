import React from 'react';

const Criptomonedas = ({criptomoneda}) => {

  const { FullName, Name } = criptomoneda.CoinInfo;

  return ( 
    <option value={Name}>{FullName}</option>
   );
}
 
export default Criptomonedas;