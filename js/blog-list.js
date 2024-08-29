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



// Открытия поиска
document.getElementById('open-search').addEventListener('click', function() {
  const searchContainer = document.getElementById('search-container');
  const searchBox = document.querySelector('.search-box');

  searchContainer.classList.add('active');

  setTimeout(() => {
      searchBox.classList.add('expanded');
  }, 500);
});

document.getElementById('close-search').addEventListener('click', function() {
  const searchContainer = document.getElementById('search-container');
  const searchBox = document.querySelector('.search-box');

  searchBox.classList.remove('expanded');

  setTimeout(() => {
      searchContainer.classList.remove('active');
  }, 500);
});

document.getElementById('search-btn').addEventListener('click', function() {
  const searchInput = document.getElementById('search-input').value;

  alert('Вы хотели найти: ' + searchInput);
});



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
  '.categories',
  '.blog-list-card',
  '.blog-search',
  '.blog-about',

  '.company-info',
  '.customer-service',
  '.extras',
  '.store-information'
];

observeElements(selectors);

