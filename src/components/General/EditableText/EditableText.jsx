import React, { Component } from 'react';
import './EditableText.css'

class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
          edit: false
        };
    }

    componentWillMount(props) {
        this.text = this.props.text || '';
    }

    componentWillReceiveProps(props) {
        this.style = {color: props.color};
    }

    save() {
        this.text = this.input.value;
        this.setState({edit: false});
        this.props.inputRef({value: this.text})
    }

    render() {
        return (
            <div className={ this.props.className + ' editable-text'}>
                <div className="content">
                    <div className="small-buttons">
                        <div onClick={ () => this.setState({edit: true})}
                             style={ this.state.edit ? {display: 'none'} : {} }>
                            EDIT
                        </div>
                        <div onClick={ this.save.bind(this) }
                             style={ !this.state.edit ? {display: 'none'} : {} }>
                            SAVE
                        </div>
                        <div onClick={ () => this.setState({edit: false})}
                             style={ !this.state.edit ? {display: 'none'} : {} }>
                            CANCEL
                        </div>
                    </div>
                    {
                        this.state.edit ?
                            (
                                this.props.textarea ?
                                    <textarea ref={ (el) => this.input = el }
                                              style={ this.style }/> :
                                    <input ref={ (el) => this.input = el }
                                           style={ this.style }/>
                            )
                            :
                            <div style={ this.style }>
                                { this.text.split('\n').map((line, index) => <div key={ index }>{ line }</div>) }
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default EditableText;
