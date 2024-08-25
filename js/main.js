// Открытия menu
const burger = document.getElementById('burger');
const navList = document.querySelector('.header__nav-list');

function openMenuByBurger() {
    navList.classList.toggle('active');
    burger.classList.toggle('active');
}

burger.addEventListener('click', openMenuByBurger);

// Открытия sub-menu
document.querySelectorAll('.header__nav-item').forEach(item => {
  item.addEventListener('click', function() {
      document.querySelectorAll('.header__nav-item').forEach(el => {
          if (el !== item) {
              el.classList.remove('active');
              el.querySelector('.submenu').classList.remove('active');
              el.querySelector('#i-down').style.display = 'block';
              el.querySelector('#i-up').style.display = 'none';
          }
      });
      
      item.classList.toggle('active');
      const submenu = item.querySelector('.submenu');
      submenu.classList.toggle('active');
      
      const iDown = item.querySelector('#i-down');
      const iUp = item.querySelector('#i-up');
      iDown.style.display = submenu.classList.contains('active') ? 'none' : 'block';
      iUp.style.display = submenu.classList.contains('active') ? 'block' : 'none';
  });
});

// Открытия sidebar-а
const sidebarBurger = document.getElementById('sidebarBurger');
const overlay = document.getElementById('overlay');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const sidebarContent = sidebar.querySelector('.sidebar-content')

function openSidebar() {
    overlay.classList.add('active');
    setTimeout(() => {
        sidebar.classList.add('active');
    }, 700)
    setTimeout(() => {
        sidebarContent.classList.add('active');
    }, 1400)
}

function closeSidebar() {
    sidebarContent.classList.remove('active');
    setTimeout(() => {
        sidebar.classList.remove('active');
    }, 350)
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 700)
}

sidebarBurger.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);




// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const slideContents = document.querySelectorAll('.slide-content');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;
let slideInterval;
let isScrolling = false;

function startAutoSlide() {
  slideInterval = setInterval(() => {
    if (!isDragging && !isScrolling) {
      currentIndex = (currentIndex + 1) % slideElements.length;
      setPositionByIndex();
    }
  }, 3000);
}


function setPositionByIndex() {
  const newTranslate = currentIndex * -window.innerWidth;
  slides.style.transform = `translateX(${newTranslate}px)`;


  slideContents.forEach((content, index) => {
    content.classList.remove('active');
    if (index === currentIndex) {
      content.classList.add('active');
    }
  });
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

function startDrag(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
}

function drag(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  const diff = currentPosition - startPos;
  currentTranslate = prevTranslate + diff;
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

function endDrag() {
  cancelAnimationFrame(animationID);
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slideElements.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();
  prevTranslate = currentTranslate;
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
  slides.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

slider.addEventListener('wheel', (e) => {
  if (isDragging) return;
  isScrolling = true;
  
  if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex -= 1;
  } else if (e.deltaY > 0 && currentIndex < slideElements.length - 1) {
    currentIndex += 1;
  }
  
  setPositionByIndex();
  
  setTimeout(() => {
    isScrolling = false;
  }, 2000);
});

window.addEventListener('load', () => {
  setPositionByIndex();
  startAutoSlide();
});

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('mousemove', drag);

slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('touchmove', drag);

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);



// Функция для обработки пересечения элементов с областью видимости
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('show-animation');
    }
  });
}

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);

function observeElements(selectors) {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  });
}

let selectors = [
  '.service-card',
  '.genemy-image',
  '.genemy-text',
  '.our-team-card',
  '.swiper-slide',
  '.blog-card',
  
  '.portfolio-project',
  '.company-info',
  '.customer-service',
  '.extras',
  '.store-information'
];

observeElements(selectors);


// Фильтр
document.addEventListener('DOMContentLoaded', () => {
    const filterItems = document.querySelectorAll('.portfolio-filter li');
    const projects = document.querySelectorAll('.portfolio-project');

    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            const filter = item.getAttribute('data-filter');
            
            filterItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            projects.forEach(img => {
                const category = img.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                }
            });
        });
    });

    document.querySelector('.portfolio-filter li[data-filter="all"]').click();
});

