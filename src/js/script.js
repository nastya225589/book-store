// svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){
  // весь ваш код c jQuery
  $('#main-nav__toggle').on('click', function() {
    $('#main-nav').toggleClass('main-nav--open');
  });

  $("[data-main-nav]").hide();
  $('#main-nav__toggle').on('click', function(){
    $('[data-main-nav]').slideToggle(250);
    return false;
  })
  ;
  // AOS.init();

  $('.menu-book__list').slick({
    arrows: false,
    centerMode: true,
    variableWidth: true,
    infinite: false,
    centerMode: false,
    centerPadding: false
  });

  $('.new-book__inner').slick({
    arrows: false,
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    centerMode: false,
    autoplaySpeed: 2000,
    centerPadding: false
  });

  $('.promo').slick({
    variableWidth: true,
    centerPadding: false,
    centerPadding: false,
    prevArrow: '<button class="promo__slick promo__slick-prev" type="button"><svg width="40" height="40" class="promo__bg-arrow"><use href="img/sprite-svg.svg#bg_arrow"></use></svg><svg width="9" height="16" class="promo__arrow promo__arrow-prev"><use href="img/sprite-svg.svg#prev"></use></svg></button>',
    nextArrow: '<button class="promo__slick promo__slick-next" type="button"><svg width="40" height="40" class="promo__bg-arrow"><use href="img/sprite-svg.svg#bg_arrow"></use></svg><svg width="9" height="16" class="promo__arrow promo__arrow-next"><use href="img/sprite-svg.svg#next"></use></svg></button>',
    // autoplay: true,
    // autoplaySpeed: 2000
  });


});

// Если на проекте нет jQuery, но хочется $( document ).ready... (IE9+)
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  const classWrap = `books__content`;
  const classList = `book__list`;
  const classItem = `book__item`;
  const classLink = `book__link`;
  const classImg = `book__img`;
  const classTitle = `book__title`;
  const classDesc = `book__desc`;
  const classPrice = `book__price`;

  const classWrapPagination = `books__pagination`;
  const classListPagination = `pagination__list`;
  const classItemPagination = `pagination__item`;
  const classLinkPagination = `pagination__link`;

  //кол-во книг на разрешении свыше 768
  const countTablet = 8;
  //кол-во книг на мобилке до 768
  const countMobile = 3;

  let data;

  const books = {
    count: 200,
    items: [
      {
        uri: "literaturnyy-master-klass",
        title: "Литературный мастер-класс",
        desc: "",
        price: 773,
        type: "creativity"
      },
      {
        title: 'Правила мозга',
        price: 700
      },
      {
        title: 'Правила мозга',
        price: 700
      },
      {
        title: 'Всегда вовремя',
        price: 920
      },
      {
        title: 'Супермен по привычке',
        price: 590
      },
      {
        title: 'Работа как внутренняя игра',
        price: 700
      },
      {
        title: 'Дзен-камера',
        price: 840
      },
      {
        title: 'Быть интровертом',
        price: 680
      }
    ]
  };

  function addToPage(element, targetClass) {
    const wrap = document.querySelector(targetClass);
    wrap.appendChild(element);
  }

  function removeFromPage(targetClass) {
    const element = document.querySelector(`.${targetClass}`);
    const parent = element.parentElement;
    parent.removeChild(element);
  }



  function createElement(tag, classElement) {
    const element = document.createElement(tag);
    element.classList.add(classElement);
    return element;
  }

  function addItems(data) {
    const booksListNode = createElement('div', classList);
    const items = data.items;

    for (let i = 0; items.length > i; i++) {
      const booksItemNode = createElement('div', classItem);

      booksItemNode.innerHTML = `
      <a href="#" class="${classLink}"><img class="${classImg}" width="260" height="370" src="img/${items[i].uri}.png"></a>

      <h3 class="${classTitle}">
        <a href="#" class="${classLink}">
        ${items[i].name}
        </a>
      </h3>
      <p class="${classDesc}">
        ${items[i].desc}
      </p>
      <p class="${classPrice}">
        ${items[i].price} ₽
      </p>`;

      booksListNode.appendChild(booksItemNode);
    }

    return booksListNode;
  }

  function toggleContent(button) {
    const btn = document.querySelector(button);

    if(!btn) {
      return;
    }

    btn.addEventListener('click', function() {
      removeFromPage(classList);
      addToPage(addItems(), '.books__content');
    });

  }

  // toggleContent('.j-view-books');

  function addItemsPagination(count) {
    const paginationListNode = createElement('ul', classListPagination);

    for (let i = 0; count > i; i++) {
      const paginationItemNode = createElement('li', classItemPagination);

      paginationItemNode.innerHTML = `
      <a href="#" class="${classLinkPagination}">
        ${i+1}
      </a>`;

      paginationListNode.appendChild(paginationItemNode);
    }

    return paginationListNode;
  }

  function calculatePageNumber(data) {
    if (window.matchMedia("(min-width: 768px)").matches) {
      return Math.ceil(data.count / countTablet);
    } else {
      return Math.ceil(data.count / countMobile);
    }
  }

  function getItemsPerPage() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      return countTablet;
    } else {
      return countMobile;
    }
  }

  function generateListener() {
    const paginationItems = document.querySelectorAll(`.${classItemPagination}`);
    paginationItems.forEach(function(elem, index) {
      elem.addEventListener('click', function(e) {
        e.preventDefault();
        getServerData(index + 1);
      });
    });
  }

  function getServerData(page, type = '') {
    const perPage = getItemsPerPage();
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.do-epixx.ru/htmlpro/bookstore/books/get/${page}/${perPage}/${type}`);

    xhr.send();

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const countPage = calculatePageNumber(data);
        const paginationNode = addItemsPagination(countPage);
        removeFromPage(classListPagination);
        addToPage(paginationNode, `.${classWrapPagination}`);

        const booksNode = addItems(data);
        removeFromPage(classList);
        addToPage(booksNode, `.${classWrap}`);

        generateListener();

      } else if (xhr.readyState !== 4) {
        // console.log(`Жду загруски: ${xhr.readyState}`);
      }
    };
  }

  generateListener();

  // const paginationItems = document.querySelector(`.${classItemPagination}`);
  // console.log(paginationItems);
  // paginationItems.forEach(function(elem, index) {
  //   console.log(elem);
  //   elem.addEventListener('click', function() {
  //     getServerData(index + 1);
  //   });
  // });
  // getServerData(3,6);

});
