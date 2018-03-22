import React from 'react';
import './Star.css';

const Star = ({color, state, onClick, backgroundColor, size}) => {
    return (
        <div className="star">
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 400"
                  style={ {
                    width: size,
                    height: size
                    } }
                  onClick={ onClick } >
                <defs>
                    <circle id="a" cx="175" cy="175" r="175"/>
                    <path id="b" d="M200 300L82.443 361.803l22.45-130.9L9.79 138.196l131.43-19.1L200 0l58.78 119.098 131.43 19.1-95.104 92.704 22.45 130.9z"/>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(56 34)">
                        <use id="Mask" className="scale" fill={backgroundColor} href="#a"/>
                    </g>
                    <g id="star" transform="translate(31)" className={state ? 'scaleStar' : ''}>
                    <mask id="c" fill="#fff">
                        <use href="#b"/>
                    </mask>
                    <use fill={color} href="#b"/>
                    <g mask="url(#c)">
                        <path id="Rectangle-58" fill={color} d="M200 0h59.21v118.42L200 200V0z"/>
                        <path id="Rectangle-58-Copy" fill={color} d="M200 0h-59.21v118.42L200 200V0z"/>
                    </g>
                    <g mask="url(#c)">
                        <path id="Rectangle-58" fill={color} d="M-.658 135.21V79.603h114.074L200 200-.658 135.21z"/>
                        <path id="Rectangle-58-Copy" fill={color} d="M-5.443 133.81l4.785 64.215 101.88 33.788L200 200-5.443 133.81z"/>
                    </g>
                    <g mask="url(#c)">
                        <path id="Rectangle-58" fill={color} d="M400.658 135.21V79.605H286.584L200 200l200.658-64.79z"/>
                        <path id="Rectangle-58-Copy" fill={color} d="M405.443 133.81l-4.785 64.216-101.88 33.788L200 200l205.443-66.19z"/>
                    </g>
                    <g mask="url(#c)">
                        <path id="Rectangle-58" fill={color} d="M333.25 384.006l88.236-107.335-107.652-40.5-113.594-35.79 133.01 183.626z"/>
                        <path id="Rectangle-58-Copy" fill={color} d="M327.077 374.89l-38.403 27.152-88.16-93.172-.274-108.488L327.077 374.89z"/>
                    </g>
                    <g mask="url(#c)">
                        <path fill={color} d="M63.85 387.665l136.147 45.91.673-234.926L63.85 387.664z"/>
                        <path fill={color} d="M72.14 376.13l-30.735-25.46 54.93-118.167L200.67 198.65 72.14 376.13z"/>
                    </g>
                    </g>
                    {
                        state ?
                        <path id="smallStar1" className="scale" fill={color} d="M45 44.022v-1.044c.33.015.665.022 1 .022 12.15 0 22-9.85 22-22 0 12.15 9.85 22 22 22v1c-12.15 0-22 9.85-22 22 0-12.15-9.85-22-22-22-.335 0-.67.007-1 .022z"/>
                        : ''
                    }
                    {
                        state ?
                        <path id="smallStar2" className="scale" fill={color} d="M0 318.522v-1.044c.33.015.665.022 1 .022 12.15 0 22-9.85 22-22 0 12.15 9.85 22 22 22v1c-12.15 0-22 9.85-22 22 0-12.15-9.85-22-22-22-.335 0-.67.007-1 .022z"/>
                        : ''

                    }
                    {
                        state ?
                        <path id="smallStar3" className="scale" fill={color} d="M431.5 188.022v-1.044c.33.015.665.022 1 .022 12.15 0 22-9.85 22-22 0 12.15 9.85 22 22 22v1c-12.15 0-22 9.85-22 22 0-12.15-9.85-22-22-22-.335 0-.67.007-1 .022z"/>
                        : ''
                        
                    }
                </g>
            </svg>
        </div>
    )
}

export default Star;