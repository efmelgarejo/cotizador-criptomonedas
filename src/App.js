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
          cargando: true
        })
        setTimeout(() => {
          this.setState({
            cotizacion: respuesta.data.data,
            monedaCotizada: moneda,
            cargando: false
          })
        }, 2000)
      })
  }

  render() {

    const cargando = this.state.cargando;
    let resultado;

    if (cargando) {
      resultado = <div className="sk-circle">
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
                </div>
    } else {
      resultado = <Resultado
                    cotizacion={this.state.cotizacion}
                    monedaCotizada={this.state.monedaCotizada}
                  />
    }

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

            {resultado}
            
          </div>
        </div>
      </div>
    );
  }


}

export default App;
