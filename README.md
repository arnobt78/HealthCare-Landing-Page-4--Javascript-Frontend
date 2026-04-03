# Pets Health Care Landing Page - JavaScript (Vanilla), HTML5, CSS3 Fundamental Project 5 (Framework-free SPA)

A modern, responsive Hospital Management Website built with HTML, CSS, and JavaScript. It is designed to showcase hospital services, doctors, reviews, and more, providing a professional and user-friendly interface for healthcare organizations. The site is fully static and can be run locally or hosted on any web server.

- **Live Demo:** [https://healthcare-template-4.netlify.app/](https://healthcare-template-4.netlify.app/)

---

## Table of Contents

- [Project Summary](#project-summary)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [How to Run](#how-to-run)
- [Component & Code Walkthrough](#component--code-walkthrough)
- [How to Reuse Components](#how-to-reuse-components)
- [Keywords](#keywords)
- [Conclusion](#conclusion)

---

## Project Summary

This project is a modern, responsive Hospital Management Website built with HTML, CSS, and JavaScript. It is designed to showcase hospital services, doctors, reviews, and more, providing a professional and user-friendly interface for healthcare organizations. The site is fully static and can be run locally or hosted on any web server.

---

## Features

- Responsive navigation bar with hamburger menu for mobile
- Hero section with welcome message and call-to-action
- Technology highlights section
- About Us section with public/images and detailed description
- Doctors showcase with social icons
- Services grid with icons and descriptions
- Customer reviews/testimonials
- Footer with multiple link sections
- Modern UI with custom color palette
- Uses FontAwesome and Flaticon icons

---

## Project Structure

```bash
/ (root)
├── index.html         # Main HTML file
├── style.css          # Main stylesheet
├── script.js          # JavaScript for interactivity
└── public/images/            # All image assets
    ├── logo3.png
    ├── hero2.png
    ├── about1.png
    ├── team1.jpg ...
    └── ... (other public/images)
```

---

## Technologies Used

- **HTML5**: Markup for structure
- **CSS3**: Styling and responsive design
- **JavaScript (ES6)**: UI interactivity (menu toggle)
- **FontAwesome**: Icon library
- **Flaticon UIcons**: Additional icons
- **Google Fonts (Inter)**: Typography

---

## How to Run

### Option 1: Open Directly

1. Open the project folder in your file explorer.
2. Double-click `index.html` or right-click and choose "Open With" > your browser.

### Option 2: Run with Local Server (Recommended for JS/CSS)

1. Open a terminal in the project directory.
2. Run:

   ```sh
   python3 -m http.server 8000
   ```

3. Open your browser and go to [http://localhost:8000](http://localhost:8000)

---

## Component & Code Walkthrough

### index.html

- **Header**: Contains logo, navigation links, and appointment button.
- **Main Sections**:
  - Home: Welcome message, hero image, and call-to-action buttons.
  - Technology: Highlights hospital's tech and safety.
  - About Us: Info and image about the hospital.
  - Doctors: Grid of doctor profiles with social icons.
  - Services: List of hospital services with icons.
  - Reviews: Customer testimonials with star ratings.
  - Footer: Multiple columns of links.
- **Script**: Loads `script.js` for menu interactivity.

### style.css

- Uses CSS variables for color theming.
- Responsive design with media queries.
- Custom styles for each section and component.
- Font imports and icon styling.

### script.js

- Handles hamburger menu toggle for mobile navigation:

  ```js
  let menubar = document.querySelector("#menu-bars");
  let navbar = document.querySelector(".navbar");
  menubar.onclick = () => {
    menubar.classList.toggle("fa-times");
    navbar.classList.toggle("active");
  };
  ```

### public/images/

- Contains all public/images used in the site (logo, hero, about, doctors, reviews, etc.).

---

## How to Reuse Components

This project is designed with modular components that can be easily reused in other projects. Here are some ways to do that:

- **Navigation Bar**: Copy the `<header>` and related CSS/JS to other projects for a responsive menu.
- **Section Layouts**: Each section (About, Services, Doctors, etc.) is modular and can be reused by copying the HTML and corresponding CSS.
- **Card Components**: Doctor and review cards are reusable UI blocks.
- **Color Palette**: Defined in `:root` in CSS, can be imported into other projects for consistent theming.
- **Menu Toggle JS**: The menu toggle logic in `script.js` is generic and can be reused for any mobile menu.

---

## Keywords

Hospital, Management, Website, Responsive, HTML, CSS, JavaScript, FontAwesome, Flaticon, Healthcare, Doctors, Services, Testimonials, UI, Web Design, Static Site

---

## Conclusion

This project is a great starting point for anyone looking to build a modern, responsive hospital or healthcare website. All components are modular and easy to adapt for other purposes. Feel free to customize the content, styles, and public/images to fit your needs.

---

Happy coding! 😊

Thank you!

---
