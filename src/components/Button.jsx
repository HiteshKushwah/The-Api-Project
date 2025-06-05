import React from 'react';

export const Button = (props) => {
    return (
        <>
            <button
                onClick={props.onClick}
                type={props.type}
                disabled={props.disabled}
                className={props.className}
                style={props.style}
            >
                {props.children}
            </button>
        </>
    );
};
