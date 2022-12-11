// Создаём объекты содержащие в себе изображения и текст,
// заменяемые при смене раздела в секции Projects
const projectsAdmiral = {
  images: [
    './img/projects/projects-admiral-first.jpg',
    './img/projects/projects-admiral-second.jpg',
    './img/projects/projects-admiral-third.jpg',
  ],
  city: 'Rostov-on-Don <br> LCD admiral',
  area: '81 m2',
  time: '3.5 months',
};

const projectsThieves = {
  images: [
    './img/projects/projects-thieves-first.jpg',
    './img/projects/projects-thieves-second.jpg',
    './img/projects/projects-thieves-third.jpg',
  ],
  city: 'Sochi <br> Thieves',
  area: '105 m2',
  time: '4 months',
};

const projectsPatriotic = {
  images: [
    './img/projects/projects-patriotic-first.jpg',
    './img/projects/projects-patriotic-second.jpg',
    './img/projects/projects-patriotic-third.jpg',
  ],
  city: 'Rostov-on-Don <br> Patriotic',
  area: '93 m2',
  time: '3 months',
};

const sliderImages = document.querySelector('.projects-content-slider');
const sliderNavigation = document.querySelector('.projects-slider-nav');
const sliderPaginationBullets = document.querySelector(
  '.projects-slider-pagination__wrap'
);

// создаём объект содержащий дополнительные параметры слайдера,
// такие как пагинация, автоматическое переключение слайдов
// и скорость смены слайдов в данном режиме(миллисекунды) 
const sliderOptions = {
  pagination: true,
  autoplay: false,
  autoplayInterval: 5000,
};

// вызываем функции логики секции, слайдера с переданными данными и параметрами
document.addEventListener('DOMContentLoaded', () => {
  initProjectsSection();
  initSlider(projectsAdmiral.images, sliderOptions);
});

// создаём функцию логики слайдера в которой описана:
// логика смены изображений, логика кнопок смены слайдов,
// логика пагинации, логика смены слайдов и параметров
function initSlider(content, options) {
  if (!content || !content.length) return;

  options = options || {
    titles: false,
    pagination: true,
    autoplay: false,
  };

  initSliderImages();
  initSliderBtns();

  if (options.pagination) {
    initSliderPagination();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initSliderImages() {
    content.forEach((image, index) => {
      let img = `<img class="projects-content-image img-${index} ${
        index === 0 ? 'is-active' : ''
      }" src="${content[index]}" data-index="${index}"></img>`;
      sliderImages.innerHTML += img;
    });
  }

  function initSliderBtns() {
    let sliderBtnPrev = `<button class="btn projects-slider-nav__btn prev">
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="14" viewBox="0 0 42 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63807 13.2761L2.29917e-05 6.63808L6.63807 3.80641e-05L7.58563 0.947606L1.89516 6.63808L7.58563 12.3286L6.63807 13.2761Z" fill="white"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.947579 5.96828L41.4556 5.96829L41.4556 7.30835L0.947578 7.30834L0.947579 5.96828Z" fill="white"></path>
    </svg>
  </button>`;
    let sliderBtnNext = `<button class="btn projects-slider-nav__btn next">
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="14" viewBox="0 0 42 14" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0451 0L41.6831 6.63804L35.0451 13.2761L34.0975 12.3285L39.788 6.63804L34.0975 0.947567L35.0451 0Z" fill="white"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M40.7356 7.30784L0.227569 7.30784L0.22757 5.96777L40.7356 5.96778L40.7356 7.30784Z" fill="white"></path>
    </svg>
  </button>`;

    sliderNavigation.insertAdjacentHTML('afterbegin', sliderBtnPrev);
    sliderNavigation.insertAdjacentHTML('beforeend', sliderBtnNext);

    sliderNavigation
      .querySelectorAll('.projects-slider-nav__btn')
      .forEach((btn) => {
        btn.addEventListener('click', function () {
          let currentImg =
            +sliderImages.querySelector('.is-active').dataset.index;
          let nextImg;
          if (btn.classList.contains('prev')) {
            nextImg = currentImg === 0 ? content.length - 1 : currentImg - 1;
          } else {
            nextImg = currentImg === content.length - 1 ? 0 : currentImg + 1;
          }
          moveSliderImages(nextImg);
        });
      });
  }

  function initSliderPagination() {
    content.forEach((image, index) => {
      let bullet = `<button class="btn slider-pagination-bullet img-${index} ${
        index === 0 ? 'is-active' : ''
      }" data-index="${index}"></button>`;
      sliderPaginationBullets.innerHTML += bullet;
    });
    sliderPaginationBullets
      .querySelectorAll('.slider-pagination-bullet')
      .forEach((blt) => {
        blt.addEventListener('click', function () {
          moveSliderImages(this.dataset.index);
        });
      });
  }

  function moveSliderImages(num) {
    sliderImages.querySelector('.is-active').classList.remove('is-active');
    sliderImages.querySelector('.img-' + num).classList.add('is-active');
    if (options.pagination) {
      sliderPaginationBullets
        .querySelector('.is-active')
        .classList.remove('is-active');
      sliderPaginationBullets
        .querySelector('.img-' + num)
        .classList.add('is-active');
    }
  }

  function initAutoplay() {
    setInterval(() => {
      let currentImg = +sliderImages.querySelector('.is-active').dataset.index;
      let nextImg = currentImg === content.length - 1 ? 0 : currentImg + 1;

      moveSliderImages(nextImg);
    }, options.autoplayInterval);
  }
}

// создаём функцию логики секции Projects в которой описана:
// логика сброса заменяемых элементов в секции при смене раздела,
// логика смены разделов 
function initProjectsSection() {
  let projectParamDescr = document.querySelectorAll('.projects-params__descr');
  let projectParamsDescrCity = document.querySelector(
    '.projects-params__descr.city'
  );
  let projectParamsDescrArea = document.querySelector(
    '.projects-params__descr.area'
  );
  let projectParamsDescrTime = document.querySelector(
    '.projects-params__descr.time'
  );

  function resetProjectsSection() {
    sliderImages.innerHTML = '';
    sliderPaginationBullets.innerHTML = '';
    sliderNavigation.firstElementChild.remove();
    sliderNavigation.lastElementChild.remove();
    sliderNavigation.style.opacity = 0;
    projectParamDescr.forEach((descr) => {
      descr.style.opacity = 0;
    });
  }

  let projectObjectBtnAdmiral = document.querySelector(
    '.projects-object__btn.admiral'
  );
  let projectObjectBtnThieves = document.querySelector(
    '.projects-object__btn.thieves'
  );
  let projectObjectBtnPatriotic = document.querySelector(
    '.projects-object__btn.patriotic'
  );

  function activeAdmiralBtn() {
    setTimeout(() => {
      projectParamDescr.forEach((descr) => {
        descr.style.opacity = 1;
      });
      sliderNavigation.style.opacity = 1;
      projectParamsDescrCity.innerHTML = projectsAdmiral.city;
      projectParamsDescrArea.textContent = projectsAdmiral.area;
      projectParamsDescrTime.textContent = projectsAdmiral.time;

      initSlider(projectsAdmiral.images, sliderOptions);
    }, 150);

    projectObjectBtnAdmiral.classList.add('is-active');
    projectObjectBtnAdmiral.setAttribute('tabindex', '-1');
    projectObjectBtnThieves.classList.remove('is-active');
    projectObjectBtnThieves.removeAttribute('tabindex', '-1');
    projectObjectBtnPatriotic.classList.remove('is-active');
    projectObjectBtnPatriotic.removeAttribute('tabindex', '-1');

    projectObjectBtnAdmiral.removeEventListener('click', activeAdmiralBtn);
    projectObjectBtnPatriotic.addEventListener('click', activePatrioticBtn);
    projectObjectBtnThieves.addEventListener('click', activeThievesBtn);

    resetProjectsSection();
  }

  function activeThievesBtn() {
    setTimeout(() => {
      projectParamDescr.forEach((descr) => {
        descr.style.opacity = 1;
      });
      sliderNavigation.style.opacity = 1;
      projectParamsDescrCity.innerHTML = projectsThieves.city;
      projectParamsDescrArea.textContent = projectsThieves.area;
      projectParamsDescrTime.textContent = projectsThieves.time;

      initSlider(projectsThieves.images, sliderOptions);
    }, 150);

    projectObjectBtnThieves.classList.add('is-active');
    projectObjectBtnThieves.setAttribute('tabindex', '-1');
    projectObjectBtnAdmiral.classList.remove('is-active');
    projectObjectBtnAdmiral.removeAttribute('tabindex', '-1');
    projectObjectBtnPatriotic.classList.remove('is-active');
    projectObjectBtnPatriotic.removeAttribute('tabindex', '-1');

    projectObjectBtnThieves.removeEventListener('click', activeThievesBtn);
    projectObjectBtnAdmiral.addEventListener('click', activeAdmiralBtn);
    projectObjectBtnPatriotic.addEventListener('click', activePatrioticBtn);

    resetProjectsSection();
  }

  function activePatrioticBtn() {
    setTimeout(() => {
      projectParamDescr.forEach((descr) => {
        descr.style.opacity = 1;
      });
      sliderNavigation.style.opacity = 1;
      projectParamsDescrCity.innerHTML = projectsPatriotic.city;
      projectParamsDescrArea.textContent = projectsPatriotic.area;
      projectParamsDescrTime.textContent = projectsPatriotic.time;
      initSlider(projectsPatriotic.images, sliderOptions);
    }, 150);

    projectObjectBtnPatriotic.classList.add('is-active');
    projectObjectBtnPatriotic.setAttribute('tabindex', '-1');
    projectObjectBtnThieves.classList.remove('is-active');
    projectObjectBtnThieves.removeAttribute('tabindex', '-1');
    projectObjectBtnAdmiral.classList.remove('is-active');
    projectObjectBtnAdmiral.removeAttribute('tabindex', '-1');

    projectObjectBtnPatriotic.removeEventListener('click', activePatrioticBtn);
    projectObjectBtnAdmiral.addEventListener('click', activeAdmiralBtn);
    projectObjectBtnThieves.addEventListener('click', activeThievesBtn);

    resetProjectsSection();
  }

  projectObjectBtnAdmiral.addEventListener('click', activeAdmiralBtn);
  projectObjectBtnThieves.addEventListener('click', activeThievesBtn);
  projectObjectBtnPatriotic.addEventListener('click', activePatrioticBtn);
}
