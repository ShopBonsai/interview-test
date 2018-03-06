// Framework
import React from "react";

const Details = ({info, children}) => {
    return (
        <div className="info">
            <hr/>
            {info.map(({label, value}) =>
                <div className="info-row" key={`${name}-${label}-${value}`}>
                    <div className="label">
                        {label}:
                    </div>
                    <div className="value">
                        {value}
                    </div>
                </div>
            )}
            {children}
        </div>
    )
};

export default Details;