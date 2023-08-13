/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 **/
// Define Global Variables
const Sections = document.querySelectorAll("section");
const navbar = document.getElementById("navbar__list");
const sectionsArray = Array.from(Sections);


// Build the nav
for (let i = 0; i < Sections.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${Sections[i].id}"> ${Sections[i].id}</a>`;
    navbar.appendChild(li);
};
let prevScrollPos = window.pageYOffset;

// Check if section is in viewport
function isActive(section) {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Adjust the threshold value as needed active
    const threshold = 0.8; 
    // Calculate the top and bottom thresholds for section 
    const topThreshold = windowHeight * threshold;
    const bottomThreshold = windowHeight * (1 - threshold);
    // Check if the section is visible within the viewport
    return (
        (rect.top >= 0 && rect.top <= bottomThreshold) ||
        (rect.bottom >= topThreshold && rect.bottom <= windowHeight)
    );
};

window.onscroll = function () {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    };

    // Activate section and corresponding navigation item
    let activeSection = null;
    for (let section of Sections) {
        if (isActive(section)) {
            section.classList.add("your-active-class");
            activeSection = section;
        } else {
            section.classList.remove("your-active-class");
        }
    }
    // Activate corresponding navigation item and remove class from non-active items
    const navigationItems = document.querySelectorAll("#navbar__list"); // Replace with your actual selector for navigation items
    for (let navItem of navigationItems) {
        if (navItem.dataset.section === activeSection?.id) {
            navItem.classList.add("active");
        } else {
            navItem.classList.remove("active");
        }
    }
};



// active class from list items
const target = document.querySelectorAll('nav li');
function ActiveClass(index) {
    if (Sections[index].classList.contains('active'))
        return;
    const nActive = document.querySelectorAll('nav .active');
   
    for (let i = nActive.length - 1; i >= 0; i--) {
        nActive[i].classList.remove('active');
    }

    target[index].classList.add('active');
};

// The degree of intersection between the sections and root .
let back = (entries) => {
    if (entries[0].intersectionRatio <= 0) {
        return;
    }
    if (entries[0].intersectionRatio > 0.70) {
        ActiveClass(sectionsArray.indexOf(entries[0].target))
    }
};
let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
};

//Create new observer and  callback
let observer = new IntersectionObserver(back, options);
// Build the array of threshold ratios
for (let i = 0; i < Sections.length; i++) {
    observer.observe(Sections[i]);
};

