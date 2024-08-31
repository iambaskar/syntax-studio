import React, { useEffect } from 'react'
export const Recipes = () => {
  const imgs = [
    "https://deadline.com/wp-content/uploads/2023/11/The-Boys-Homelander-e1720743363244.jpg",
    "https://imageio.forbes.com/specials-images/imageserve/62af107cfb61140c4b0ae103/starr/960x0.jpg?format=jpg&width=960",
    "https://static.theprint.in/wp-content/uploads/2024/07/ANI-20240711172847.jpg",
    "https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/w/z/w/large-t0186-the-boys-billy-butcher-and-homelander-poster-18-x-12-original-imaghtyagtud6acy.jpeg?q=90&crop=false",
    "https://www.rtvmaniak.pl/wp-content/uploads/rtvmaniak/2024/07/Zrzut-ekranu-2024-07-01-114553.png"
  ];

  const galleryRef = React.useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      console.log(clientX, clientY);
      const { width, height } = currentTarget.getBoundingClientRect();
      const x =  width / 2;
      const y = height / 2;
      const scrollX = (x - clientX) / 1;
      const scrollY = (y - clientY) / 1;
      
      galleryRef.current.style.transform = `translate(calc(-50% + ${scrollX}px), calc(-50% + ${scrollY}px))`;
    };

    const container = document.querySelector('.container');
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
    <div className="container">
      <div className="gallery-box" ref={galleryRef}>
        {
          imgs.map((img, index) => (
            <div key={index} className="gallery-item">
              <img src={img} alt="Recipe" />
            </div>
          ))
        }
      </div>
    </div>
  )
}
