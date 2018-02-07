import React from 'react';
import TextNote from './TextNote/TextNote';
import ImageNote from './ImageNote/ImageNote';
import TextImageNote from './TextImageNote/TextImageNote';
import ExpendableNote from './ExpendableNote/ExpendableNote';
import './NoteAnimations.css'

function isTextOnly(props) {
    return !props.imageUrl && !props.longText && (props.title || props.text)
}

function isImageOnly(props) {
    return props.imageUrl && !(props.title || props.text)
}

function isExpendable(props) {
    return props.longText
}

function getNoteType(props) {
    if (isTextOnly(props)) {
        return TextNote
    } else if (isImageOnly(props)) {
        return ImageNote
    } else if (isExpendable(props)) {
        return ExpendableNote
    } else return TextImageNote
}

function NoteFactory (props) {
    let Note = getNoteType(props);
    const className = `${props.className || ''} ${props.animation || ''} ${props.focus ? 'enter' : 'leave'}`;
        return  <Note {...props} className={ className } />
}

export default NoteFactory
