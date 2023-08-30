import React from 'react';

const Keyboard = ({ keys, onKeyPress }) => {
    return (
        <div className="keyboard" style={{
            maxWidth: "600px", margin: "auto"
        }}>
            {
                keys.map((key, index) => (
                    <button key={index} onClick={() => onKeyPress(key)}>
                        {key}
                    </button>
                ))
            }
        </div >
    );
};

export default Keyboard;
