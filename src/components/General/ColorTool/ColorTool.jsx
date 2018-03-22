import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { BlockPicker } from 'react-color';

import './ColorTool.css'

class ColorTool extends Component {
    constructor(props) {
        super(props);
        this.colors = {};
    }

    generateInputs() {
        let schema = this.props.schema;
        return Object.keys(schema).map((key) => {
            return <div key={ key }>
                { key }
                        <BlockPicker
                            id={ key }
                            color={ schema[key] }
                            onChangeComplete={ (color) => this.colors[key] = color.hex }
                        />
                   </div>
        })
    }

    render() {
        return (
            <div className="color-tool">
                <div>
                    { this.generateInputs.bind(this)() }
                </div>
                <div className="buttons-container">
                    <RaisedButton onClick={ () => {
                                                let colors = Object.assign({}, this.props.schema, this.colors);
                                                this.props.save(colors)
                                            }
                                  }
                                  label="Save"
                                  primary={true} />
                    <RaisedButton onClick={ this.props.cancel } label="Cancel"/>
                </div>
            </div>
        )
    }
}

export default ColorTool;
