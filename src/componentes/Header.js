import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="mt-3">
                <h1 className="text-center">
                {this.props.titulo}
                </h1>
            </div>
         );
    }
}
 
export default Header;