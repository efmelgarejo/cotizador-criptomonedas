import React, { Component } from 'react';
import Header from './componentes/Header'
import Formulario from './componentes/Formulario'
import Resultado from './componentes/Resultado'
import axios from 'axios';

class App extends Component {

  state = {
    monedas: [],
    cotizacion: {},
    monedaCotizada: '',
    cargando: false
  }

  async componentDidMount() {
    this.obtenerMonedas();
  }


  obtenerMonedas = async () => {
    const URL = `https://api.coinmarketcap.com/v2/ticker/`;

    await axios.get(URL)
      .then(respuesta => {
        this.setState({
          monedas: respuesta.data.data
        })
      })
      .catch(error => {
        console.log(error)
      })

  }

  // cotizar una crypto en base a una moneda
  obtenerValoresCripto = async (monedas) => {
    const { moneda, cripto } = monedas;

    const url = `https://api.coinmarketcap.com/v2/ticker/${cripto}/?convert=${moneda}`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          cotizacion: respuesta.data.data,
          monedaCotizada: moneda
        })
      })
  }

  render() {
    return (
      <div className="container">
        <Header
          titulo="Cotizador de Criptomonedas"
        />

        <div className="row justify-content-center">
          <div className="col-md-6 bg-light pb-4 contenido-principal">
            <Formulario
              monedas={this.state.monedas}
              obtenerValoresCripto={this.obtenerValoresCripto}
            />

            <Resultado
              cotizacion={this.state.cotizacion}
              monedaCotizada={this.state.monedaCotizada}
            />
          </div>
        </div>
      </div>
    );
  }


}

export default App;
