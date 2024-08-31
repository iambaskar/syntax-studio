import React from 'react'
import '../../styles/Home/EssentialTemplate.css';
export const EssentialTemplate = ({ data }) => {
    return (
        <div className="essential-template">
            <div className="essential-template-left">
                <h1>{data.title}</h1>
            </div>
            <div className="essential-template-right">
                <p>{data.desc}</p>
                <button>Learn more</button>
            </div>
        </div>
    )
}
