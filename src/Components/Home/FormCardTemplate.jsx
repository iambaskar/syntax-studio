import React from 'react'
import '../../styles/Home/FormCardTemplate.css'
export const FormCardTemplate = ({ data }) => {
    return (
        <div className="form-card-template">
       <div className='form-card-template-inner'>
       <div className="form-card-template-img-box">
        <img src={data.img} alt="" />
        </div>
        <h3 className="form-card-template-title">{data.title}
        </h3>
        <p>{data.desc}</p>
       </div>
        
       <button className='form-card-template-read-more'>Read more</button>
        </div>
    )
}
