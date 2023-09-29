$(document).ready(function () {


    //подключаем wow анимацию
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // popup lib
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
    $('.products-img').magnificPopup({
        type: 'image',
    });

    //переписываем на  jQuery

    $('h1').html('Самая крутая пицца ждет <span>только в нашем ресторане</span>')
    // document.getElementsByTagName('h1')[0].innerHTML = "Самая крутая пицца ждет <span>только в нашем ресторане</span>";
    $('#pizza-menu').css('color', 'black')
    // document.getElementById('pizza-menu').style.color = 'black';
    $('.btn:not(#no-touch, #changePizza)').css({
        backgroundColor: 'transparent',
        border: '1px solid rgb(255, 175, 24)',
        color: 'rgb(255, 175, 24)'
    });
    //  через forEach
    // let buttonElements = document.querySelectorAll('.btn');
    // buttonElements.forEach(element => {
    //     if ((element.innerText === 'Оформить заказ') || (element.id === 'no-touch')) { //две кнопки к которым не применяются стили
    //         return; //для forEach нельзя использовать continue как для for
    //     }
    //     element.style.backgroundColor = 'transparent';
    //     element.style.border = '1px solid rgb(255, 175, 24)';
    //     element.style.color = 'rgb(255, 175, 24)';
    // });


    //2 варианта изменить placeholder
    $('#product-input').attr('placeholder', 'Пицца');
    $('#adress-input').attr('placeholder', 'Адрес');

    // document.getElementById('product-input').placeholder = 'Имя';
    // document.getElementById('adress-input').setAttribute('placeholder', 'Адрес');

    //делаем динамическую дату
    $('.rights span').text(new Date().getFullYear());
    // let currentYear = new Date().getFullYear();
    // let data = document.querySelector('.rights span').innerText = currentYear;

    //меняем текст в карточках product каждому четному
    // let products = $('.product')
    // for (let i = 0; i < products.length; i++) {
    //     if (i % 2 === 1) {
    //         let element = products.eq(i).children().eq(1);
    //         element.text(element.text() + '*')
    //     }
    // }
    //второй вариант
    // $('.product').each(function(index) {
    //     if ($(this).is(':odd')) {
    //         $(this).children().eq(1).text(function(_, text) {
    //             return text + '*';
    //         });
    //     }
    // });
    //третий вариант чтобы выбрать все четные элементы с 
    //классом `.product`. Затем мы используем 
    //`.children(':nth-child(2)')`, 
    //чтобы найти второго ребенка каждого выбранного элемента.

    // $('.product:nth-child(even)').children(':nth-child(2)').text(function(index, text) {
    //     return text + '*';
    // });
    //более упрощеная версия
    $('.product:nth-child(even)').children(':nth-child(2)').append('*');

    // let products = document.getElementsByClassName('product');
    // for (let i = 0; i < products.length; i++) {
    //     if (i % 2 === 1) { // равно не 0 а 1 так как индексы начинаются с 0
    //         products[i].children[1].innerText += '*';
    //     }
    // }



    // плавный переход к пиццам
    let namePizza = $('.order-input')[0];
    $('#changePizza').click(function () {
        $('.products')[0].scrollIntoView({ behavior: 'smooth' })
    });


    //добавляем в корзину и в поле оформить заказ
    // let productInput = $('#product-input');
    // $('.btn-add-to-cart').click((e) => {
    //     productInput.val($(e.target).parents('.product').children('.product-title').text())
    //     $('.order')[0].scrollIntoView({ behavior: 'smooth' });
    // })
    // let addToCartButtons = document.getElementsByClassName('btn-add-to-cart');
    // let productInput = document.getElementById('product-input');
    // //parentElement.previousElementSibling - родительский затем соседний предыдущий
    // for (let i = 0; i < addToCartButtons.length; i++) {
    //     addToCartButtons[i].onclick = function (e) {
    //         let namePizza = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
    //         productInput.value = namePizza;
    //         document.getElementsByClassName('order')[0].scrollIntoView({ behavior: 'smooth' });
    //     }
    // };
    // вариант добавления товаров с использованием localStorage
    // let cart = [];
    // $('.btn-add-to-cart').click((e) => {
    //     let productTitle = $(e.target).parent().siblings('.product-title').text().trim();

    //     cart.push(productTitle)
    // })

    // ..переход к заказу и заполнение поля если было удалено
    $('.cart').click(function () {
        if (namePizza.value) {
            namePizza.value = cartArray
        }
        namePizza.scrollIntoView({ behavior: 'smooth' })
    });
    let productInput = $('#product-input');
    let cartArray;
    $('.btn-add-to-cart').click((e) => {
        let productTitle = $(e.target).parent().siblings('.product-title').text().trim();


        let cart = localStorage.getItem('cart');
        cartArray = [];

        if (cart) {
            cartArray = JSON.parse(cart);
        }

        cartArray.push(productTitle);
        localStorage.setItem('cart', JSON.stringify(cartArray));
        // добавление в поле заказа нового продукта при выборе
        let currentTitles = productInput.val();
        let newTitle = $(e.target).parents('.product').children('.product-title').text();

        if (currentTitles === '') {
            productInput.val(newTitle);
        } else {
            productInput.val(currentTitles + ', ' + newTitle);
        }
        // добавление количества в иконку корзины
        $('.cart-num').text(cartArray.length)
    });


    // обновление корзины после перезагрузки или добавления
    function updateCartIcon() {
        let cart = localStorage.getItem('cart');
        let cartArray = cart ? JSON.parse(cart) : [];

        $('.cart-num').text(cartArray.length);
    }
    updateCartIcon();

    // проверяем заполненность полей заказа
    let adressInput = $('#adress-input');
    let phoneInput = $('#phone-input');
    $('#create-order').click(function () {
        if (productInput.val().trim() === '') { //проверяет елси есть пустые строки даже пробелы
            alert('Выберите Пиццу');
            return;
        }
        if (!adressInput.val()) { //проверят только на наличие любых символов даже если пробел
            alert('Заполните поле с адресом')
            return;
        }
        if (!phoneInput.val()) {
            alert('Заполните поле с телефоном')
            return
        }
        alert('Спасибо за заказ!');
        // запрос куки на сервер
        $.ajax({
            method: 'GET',
            url: 'https://testologia.site/test-cookie?name=' + productInput.value,
            xhrFields: {
                withCredentials: true
            }
        });
        phoneInput.val('');
        adressInput.val('');
        productInput.val('');
    });



    //формат телефона через plagin

    phoneInput.inputmask({ "mask": "(999) 999-9999" });



    // phoneInput.keydown((e) => {
    //     let num = parseInt(e.key);
    //     if (e.key === 'Backspace') {
    //         return
    //     }
    //     if (isNaN(num)) {
    //         return false;
    //     }
    // });
    // // phoneInput.blur((e) => {
    // //     let $target = $(e.target);
    // //     let value = $target.val();
    // //     $target.val(value.slice(0, 3) + '-' + value.slice(3, 5) + '-' + value.slice(5, 7));
    // // });
    // // phoneInput.blur((e) => {
    // //     let target = $(e.target)
    // //     target.val(target.val().slice(0, 3) + '-' + target.val().slice(3, 5) + '-' + target.val().slice(5, 7))
    // // });

    // //другой вариант

    // phoneInput.blur((e) => {
    //     let $target = $(e.target);
    //     let value = $target.val();
    //     $target.val(value.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3'));
    // });

    // cookie vs Local Storage
    if (!localStorage.getItem('cookieAccepted')) {
        $('.cookie').show();
    }

    $('.cookie-accept').on('click', function () {
        $('.cookie').hide();
        // подставляем любые значения например  'cookieAccepted', '1'
        localStorage.setItem('cookieAccepted', '1')
    });

    // пасинг cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2)
            return parts.pop().split(';').shift();
    }
    /* 
    функция getCookie(name) предназначена для извлечения значения cookie с указанным именем. 
    
    В функции getCookie(name) создается переменная value, которая получает значение document.cookie, 
    содержащее все существующие cookie в текущей сессии. 
    document.cookie возвращает строку, содержащую все cookie, разделенные точкой с запятой.
    
    Затем переменная value разбивается на части с помощью метода split().
    используем разделитель ; ${name}=, чтобы найти часть строки, содержащую значение cookie 
    с указанным именем. Метод split() возвращает массив, где первый элемент массива - это все,
     что находится перед ${name}=, а второй элемент - это все, что находится после ${name}=.
    
    Далее, если длина массива parts равна 2 (то есть если была найдена часть строки со 
    значением cookie), мы берем второй элемент массива (с помощью pop()) и делим его по точке 
    с запятой (с помощью split(';')). Мы затем берем первый элемент нового массива (с помощью shift()), 
    который представляет собой само значение cookie.
    
    В конце функция возвращает это значение cookie.
    
    */

    // код для работы с cookies, библиотека куки
    let cookie = {
        set: (name, value, option) => {
            if (!name || !value) {
                return null;
            }

            let string = name + '=' + value;
            if (option) {
                string += ';' + option;
            }

            document.cookie = string;
            return cookie;
        },
        get: (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2)
                return parts.pop().split(';').shift();

        },
        delete: (name) => {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:001 GMT';
        }
    }

    // запрос куки на сервер

    // $.ajax({
    //     method: 'GET',
    //     url: 'https://testologia.site/test-cookie?name=' + productInput.value,
    //     xhrFields: {
    //         withCredentials: true
    //     }
    // });
    /* 
    дополнительный параметр 'xhrFields', который устанавливает свойство 'withCredentials' 
    в значение 'true'. Это позволяет включить передачу куки (cookies) при выполнении запроса.
    Когда 'withCredentials' установлен на 'true', браузер включит автоматическую отправку куки, 
    связанных с запрашиваемым доменом. Это позволяет отправить сохраненные куки на 
    сервер 'https://testologia.site' при выполнении этого запроса.
    */



});