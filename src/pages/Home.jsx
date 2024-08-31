import React from 'react'
import '../styles/home.css'
import { FormCardTemplate } from '../Components/Home/FormCardTemplate'
import { useSelector } from 'react-redux'
import { CardTemplate } from '../Components/Home/CardTemplate'
import { EssentialTemplate } from '../Components/Home/EssentialTemplate'
export const Home = () => {
    const formData = useSelector(state => state.home.formData);
    const cardData = useSelector(state => state.home.cardData);
    const essentials = useSelector(state => state.home.essentials);
    return (
        <>
            {/* section 1 */}

            <div className='home'>
                <h1>Transform Your Web Development Skills with Modern UI Techniques</h1>
                <p>Master CSS, JavaScript, GSAP, and React with in-depth tutorials and interactive demos. Create modern, stunning websites with ease at Syntax Studio.</p>
                <button className="home-explore-btn">Recipes</button>
            </div>


            {/* section 2 */}
            <div className="home-section3">
                <h2 className='home-section3-heading'>Card UI Showcase
                </h2>
                <p>Explore innovative card UI designs with interactive animations and effects. These examples demonstrate modern techniques to enhance user engagement and visual appeal.</p>
              <div className="home-section3-cards">
                {
                    cardData?.map((data, index) => <CardTemplate key={index} data={data} />)
                }
              </div>
              
            </div>

             {/* section 4 */}

             <div className="home-section4">
                <h1>Website Essentials</h1>
                <p>Build cohesive and user-friendly interfaces with well-designed menus, footers, and layouts. These essential components ensure a seamless and intuitive navigation experience across your website.</p>
                {
                    essentials?.map((data, index) => <EssentialTemplate key={index} data={data} />)
                }
            </div>

            {/* section 3 */}
            <div className="home-section2">
                <h2 className='home-section2-heading'>Forms Concepts and UI</h2>
                <p>Forms are crucial for gathering user input and enabling interactions. Mastering form design is essential for building effective and user-friendly web applications.</p>
                <div className="home-section2-cards">
                    {
                        formData?.map((data, index) => <FormCardTemplate key={index} data={data} />)
                    }
                </div>
            </div>

            {/* section 5 */}
            <div className="home-section5">
                
            </div>

        </>
    )
}
