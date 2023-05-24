// import { langArr } from '../js/lang.js'

//? scroll-top button
$(function () {
    $('#scroll-top').hide();
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) {
			$('#scroll-top').show();
		} else {
			$('#scroll-top').hide();
		}
	});
 
	$('#scroll-top').click(function(){
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
	});
});

//? language changing
const langArr = {
    "doctitle-0": {
        "ru": "Главная - УчиДелай",
        "en": "Home - StudyMake",
    },
    "doctitle-1": {
        "ru": "Информатика - УчиДелай",
        "en": "Informatics - StudyMake",
    },
    "doctitle-2": {
        "ru": "Математика - УчиДелай",
        "en": "Maths - StudyMake",
    },
    "doctitle-3": {
        "ru": "Физика - УчиДелай",
        "en": "Physics - StudyMake",
    },
    "doctitle-4": {
        "ru": "Литература - УчиДелай",
        "en": "Literature - StudyMake",
    },
    "title-1": {
        "ru": "Учи",
        "en": "Study",
    },
    "title-2": {
        "ru": "Делай",
        "en": "Make",
    },
    "header-link-1": {
        "ru": "Изучить",
        "en": "Learn",
    },
    "header-link-2": {
        "ru": "Создать",
        "en": "Create",
    },
    "it-title": {
        "ru": "Информатика",
        "en": "Informatics",
    },
    "maths-title": {
        "ru": "Математика",
        "en": "Maths",
    },
    "phy-title": {
        "ru": "Физика",
        "en": "Physics",
    },
    "lit-title": {
        "ru": "Литература",
        "en": "Literature",
    },
    "block-1-title": {
        "ru": `“Век живи - век учись”`,
        "en": `“It's never too late to learn”`,
    },
    "block-2-title": {
        "ru": `“Учение есть труд, полный мысли”`,
        "en": `“Teaching is a work full of thought”`,
    },
    "block-subtitle": {
        "ru": "Выберите предмет для изучения:",
        "en": "Select a subject to learn:",
    },
    "create-link": {
        "ru": "Создать тестирование",
        "en": "Create a test",
    },
    "it-guide-title": {
        "ru": "“Работает - не трогай”",
        "en": "“Don't touch if it works”",
    },
    "it-guide-subtitle": {
        "ru": "Справочник по информатике",
        "en": "Guide to Informatics",
    },
    "it-guide-elem-1-link-1": {
        "ru": "§1. Информация и её свойства.",
        "en": "§1. Information and its properties.",
    },
    "it-guide-elem-1-link-2": {
        "ru": "§2. Информационные процессы.",
        "en": "§2. Information processes.",
    },
    "it-guide-elem-1-link-3": {
        "ru": "§3. Всемирная паутина.",
        "en": "§3. The World Wide Web.",
    },
    "link-7-1-popup-title": {
        "ru": "§1. Информация и её свойства.",
        "en": "§1. Information and its properties.",
    },
    "link-7-1-popup-subtitle-1": {
        "ru": "Информация и сигнал",
        "en": "Information and signal",
    },
    "link-7-1-popup-subtitle-2": {
        "ru": "Виды информации",
        "en": "Types of information",
    },
    "link-7-1-popup-subtitle-3": {
        "ru": "Свойства информации",
        "en": "Information Properties",
    },
    "link-7-1-popup-test-subtitle": {
        "ru": "Проверь знания",
        "en": "Test your knowledge",
    },
    "footer-text": {
        "ru": "<b>StudyMake</b> (УчиДелай) - платформа, созданная для объединения процесса получения знаний с их тестированием. Учащиеся образовательных учреждений смогут изучить материал по школьному предмету, а учителя и преподаватели - создать свой тест для проверки усвоения новой темы.",
        "en": "<b>StudyMake</b> is a platform created to combine the process of acquiring knowledge with their testing. Students of educational institutions can study material on a school subject, and teachers and teachers can create their own test to check the assimilation of a new topic.",
    },
}

const select = document.querySelector('select');
const langs = ['ru', 'en'];

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
	let lang = select.value;
	location.href = window.location.pathname + '#'+lang;
	location.reload();
}

function changeLanguage() {
	let hash = window.location.hash;
	hash = hash.substr(1);
	if (!langs.includes(hash)) {
		location.href = window.location.pathname + '#ru';
		location.reload();
	}
	select.value = hash;
    // document.querySelector("title").innerHTML = langArr.doctitle[hash];
	for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
}

changeLanguage();

//? 'read more' button
let more = document.querySelectorAll('.guide__elem-arrow');

for (let i = 0; i < more.length; i++) {
    more[i].addEventListener('click', function() {
        more[i].parentNode.classList.toggle('active');
    });
}

//? popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

const timeout = 500;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        }); 
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

//? quiz
