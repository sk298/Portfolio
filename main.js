'use strict';

// Opening or closing side bar
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function() {
    elementToggleFunc(sidebar); 
  });
}

// Activating Modal-testimonial
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

if (modalContainer && overlay) {
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
      if (modalImg && this.querySelector('[data-testimonials-avatar]')) {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
      }
      if (modalTitle && this.querySelector('[data-testimonials-title]')) {
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
      }
      if (modalText && this.querySelector('[data-testimonials-text]')) {
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
      }

      testimonialsModalFunc();
    });
  }

  // Activating close button in modal-testimonial
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  }
  overlay.addEventListener('click', testimonialsModalFunc);
}

// Activating Filter Select and filtering options
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
  select.addEventListener('click', function () {
    elementToggleFunc(this); 
  });
}

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function() {
    if (selectValue) {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    }
  });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add('active');
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add('active');
    } else {
      filterItems[i].classList.remove('active');
    }
  }
}

// Enabling filter button for larger screens 
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function() {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
}

// Enabling Contact Form - UPDATED VERSION
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

// Remove the disabled attribute from the button
if (formBtn) {
    formBtn.removeAttribute('disabled');
}

// Optional: Keep basic form validation
if (form && formInputs && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            // You can keep this for visual feedback, but don't disable the button
            if (form.checkValidity()) {
                formBtn.style.opacity = "1";
            } else {
                formBtn.style.opacity = "0.7";
            }
        });
    }
}

// Enabling Page Navigation - CORRECTED SECTION
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function() {
    // Get the target page from the data-nav-link attribute
    const targetPage = this.getAttribute('data-nav-link');
    
    // Remove active class from all pages and navigation links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove('active');
      navigationLinks[j].classList.remove('active');
    }
    
    // Find and activate the target page
    for (let k = 0; k < pages.length; k++) {
      if (targetPage === pages[k].getAttribute('data-page')) {
        pages[k].classList.add('active');
        this.classList.add('active');
        break;
      }
    }
    
    window.scrollTo(0, 0);
  });
}