import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: [
    {
      id: 1,
      title: "Form Design Patterns",
      desc: "Explore various design patterns for forms, such as single-page, tabbed, or modal forms. Choose the best pattern for your application's needs.",
      img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Different Types of Inputs",
      desc: "Discover various input types and their uses. From text fields to date pickers, see how different inputs can enhance your form functionality.",
      img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "React Hook Form",
      desc: "See how to use React Hook Form for efficient form management in React applications. Streamline your form handling with minimal code.",
      img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Validation and Error Handling",
      desc: "Learn how to implement form validation and handle errors gracefully. Ensure users get clear, actionable feedback to correct their inputs.",
      img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Form Submission Techniques",
      desc: "Explore different methods for submitting forms, including AJAX and traditional form submissions.",
      img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  cardData: [
    {
      id: 1,
      title: "Animated Card Designs",
      desc: "Enhance user engagement with dynamic animations. These animated card designs use creative effects to bring interactivity and visual interest to your web pages.",
      img: "https://images.unsplash.com/photo-1607310073276-9f48dec47340?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Stacking Cards",
      desc: "Experience a card stacking effect where cards overlap and reveal more content as you interact with them. Ideal for creating a dynamic and engaging layout.",
      img: "https://images.unsplash.com/photo-1607310073276-9f48dec47340?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Modern Pricing Card Designs",
      desc: "Showcase your pricing options with sleek, interactive card designs. Perfect for highlighting different plans and features with a clean, user-friendly interface.",
      img: "https://images.unsplash.com/photo-1607310073276-9f48dec47340?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Filterable & Sortable Card Designs",
      desc: "Enhance your content display with cards that can be sorted and filtered by categories, tags, or other attributes. Perfect for portfolios, product listings, or any content-heavy site.",
      img: "https://images.unsplash.com/photo-1607310073276-9f48dec47340?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  essentials: [
    {
      id: 1,
      title: 'Modern Menu (Header) Designs',
      desc: "Create intuitive and stylish headers that guide your users seamlessly through your website. Focus on user experience with clean and responsive navigation menus."
    },
    {
      id: 2,
      title: 'Footer Design Concepts',
      desc: "Design footers that are both functional and visually appealing. These concepts focus on providing essential information and links while enhancing your site's overall aesthetic."
    },
    {
      id: 3,
      title: 'Responsive Layouts',
      desc: "Master the art of layout design with responsive structures that adapt beautifully across all devices. Whether it’s a grid, flexbox, or full-page layout, ensure your content is presented in a user-friendly manner."
    }
  ]
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getAllFormData: (state, action) => {
      state.formData = [...action.payload];
    },
    getCardData: (state, action) => {
      state.cardData = [...action.payload];
    },
    getEssentials: (state, action) => {
      state.essentials = [...action.payload];
    },
  },
});

export const { getAllFormData, getCardData, getEssentials  } = homeSlice.actions;
export default homeSlice.reducer;
