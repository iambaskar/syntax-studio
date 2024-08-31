import React from 'react'
import '../../styles/Home/HomeCardTemplate.css'
export const CardTemplate = ({data}) => {
    return (
        <div className="home-card-template">
            <div className="home-card-template-inner">
                <h3 className='home-card-template-title'>{data.title}</h3>
                <p className="home-card-template-desc">{data.desc}</p>
            </div>
            <button className='home-card-template-read-more'>Read more</button>
        </div>
    )
}
