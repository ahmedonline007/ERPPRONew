import React, { Fragment } from 'react';


const LoadingPage = (props) => {
    const style = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 1,
        width: '150px',
        height: '150px',
        margin: '-75px 0 0 -75px',
        border: '16px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '16px solid #3498db',
        width: '120px',
        height: '120px',
        //-webkit-animation: 'spin 2s linear infinite',
        animation: 'spin 2s linear infinite'
    }
    return (
        <Fragment>
            <div style={style}></div>
        </Fragment>
    );
}

export default LoadingPage;
