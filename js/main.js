let app = angular.module('ebook', ["ngRoute"]);
let apiUrl = "/parul/model/";

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutCtrl'
        })
        .when('/books/:bookID', {
            templateUrl: 'pages/openBook.html',
            controller: 'bookCtrl'
        })
        .when('/search/:searchName', {
            templateUrl: 'pages/search.html',
            controller: 'searchCtrl'
        })
        .when('/mybooks', {
            templateUrl: 'pages/myBooks.html',
            controller: 'myBooksCtrl'
        })
        .when('/pdfOpen', {
            templateUrl: 'pages/pdfOpen.html',
            controller: 'pdfOpen'
        })
        .when('/cart', {
            templateUrl: 'pages/cart.html',
            controller: 'cartCtrl'
        })
        .when('/profile', {
            templateUrl: 'pages/profile.html',
            controller: 'profileCtrl'
        })
        .when('/error', {
            templateUrl: 'pages/error.html',
            controller: 'errorCtrl'
        })
        .otherwise({
            redirectTo: '/error'
        })
});

app.run(function ($rootScope) {
    showMSG('loading');

    $rootScope.loggedin = loggedInn;

});



app.controller("homeCtrl", function ($scope, $rootScope) {
    remLoading();
    window.scrollTo(0, 0);

    /* Slider Scroll With Mouse */
    const slider = document.querySelector("#sliderAdvt");
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener("mousedown", e => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = "grabbing";
    });
    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.style.cursor = "default";
    });
    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.style.cursor = "grab";
    });
    slider.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk * 1.2;
    });


    /* Add to cart Options from the HTML 'home' page */
    let dataLinks = document.querySelectorAll(".interect .re");
    function atc() {
        if ($rootScope.loggedin === false) {
            changeMSG('messageBox');
            showMSG('messageBox');
        } else if ($rootScope.loggedin === true) {
            addToCart();
        }
        else {
            shMsg(`<p class="sm-text opa7">There was a problem.. Please Try again Later <br> or Contact to the Administrator</p>`);
        }
    };

    for (let i = 0; i <= dataLinks.length - 1; i++) {
        dataLinks[i].addEventListener('click', () => {
            atc();
        });
    }


    /* Img Advt Banner */
    let advtTemplate = '';
    fetch('json/imgAdvt.json')
        .then(res => {
            if (!res.ok) {
                shMsg("<p class='sm-text'>There was an problem in the Server.. <br /> PLease Try again Later</p>")
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            if (data.length <= 0) {
                return;
            } else {
                elem('sliderAdvt').style.gridTemplateColumns = `5% repeat(${data.length}, 80%) 5%`;
                data.forEach(function (advt, countAdvt) {
                    advtTemplate += `
                        <div class="advtbanner" data-ad="${advt.content}">
                            <img src="${advt.src}" alt="Advt" />
                        </div>
                        `;
                });
                elem('sliderAdvt').innerHTML = advtTemplate;
                elem('sliderAdvt').classList.remove('dissCONT');
            }
        })
        .catch(err => {
            shMsg("<p class='sm-text'>An unknown Error Occured.. <br /> PLease Try again Later or Contact to the Admin</p>")
            console.log(err);
        });

    /* Request Data for Category Section */
    fetch('json/category.json').then(res => {
        if (!res.ok) {
            shMsg(`<p class="sm-text opa7"><strong class="alert">404!</strong> Request Url Not Found...<br />  Please Try again later</p>`);
        } else {
            return res.json();
        }
    })
        .then(data => {
            let outputCategoryShow = '';
            if (data.length > 0) {
                data.forEach(function (d, countCATE) {
                    outputCategoryShow += `
                        <div class="cards dripple" onclick="reDirect('search/'+'${d.category}')" data-content="${d.category}" style="background-color: ${categoryColors(data.length)[countCATE]}">
                            <p>${d.category}</p>
                        </div>
                        `;
                })
            } else {
                outputCategoryShow += `<p class='alert'>No Catrgory is There !</p>`;
            }
            elem('outputCategory').innerHTML = outputCategoryShow;
        })
        .catch(err => {
            shMsg(`<p class="sm-text opa7">There was a problem in the server ! <br /> Please Try again later</p>`);
        });


    /* Repeat the Recommended Books */
    let homeBooksOutput = '';
    fetch('json/openBook.json')
        .then(res => {
            if (!res.ok) {
                shMsg("<p class='sm-text'>There was an problem in the Server.. <br /> PLease Try again Later</p>")
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            data.forEach(function (sugg) {
                homeBooksOutput +=
                    `
                    <div class="card">
                        <div class="image">
                        <img src="${sugg.img}" alt="Book" />
                        </div>
                        <div class="gText">
                        <h5>${sugg.title}</h5>
                        <p>
                            ${sugg.desc}
                        </p>
                        <p class="price">${sugg.price} <span class="strikeout opa5">${sugg.oldP}</span></p>
                        </div>
                        <div class="fh_center interect">
                        <button class="btn wide100 dripple" onclick='addToCart()'>
                            <i class="fas fa-cart-plus"></i>
                        </button>
                        <a href="#!/books/${sugg.id}" class="btn wide100 dripple">
                            <i class="fas fa-external-link-square-alt"></i>
                        </a>
                        </div>
                    </div>
                `;
            })
            elem('recomBooks').innerHTML = homeBooksOutput;
            elem('recomBooks').classList.remove('dissCONT');
        })
        .catch(err => {
            shMsg("<p class='sm-text'>An unknown Error Occured.. <br /> PLease Try again Later or Contact to the Admin</p>")
            console.log(err);
        });
});
app.controller("bookCtrl", function ($scope, $routeParams, $rootScope) {
    remLoading();
    window.scrollTo(0, 0);

    let BookID = $routeParams.bookID;

    fetch('json/openBook.json')
        .then(res => {
            if (!res.ok) {
                shMsg("<p class='sm-text'>There was an problem in the Server.. <br /> PLease Try again Later</p>")
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            /* 
            Here We are checking the Book ID With the 
            Url Parameters For Json Search 
            */
            let idmatch = false;
            let idReturn;
            data.forEach(function (bookD, countBook) {
                if (bookD.id == BookID) {
                    idmatch = true;
                    idReturn = countBook;
                }
            });
            if (idmatch === true) {
                bookOpen.innerHTML =
                    `  <div class="imgSection">
                        <img src="${data[idReturn].img}" class="cover" id="covIMG" alt="Cover Image" />
                        <img src="${data[idReturn].img}" class="imgMain" id="bookIMG" alt="BookImage" />
                    </div>
                    <div class="mainContent">
                        <h2 class="txtHead">${data[idReturn].title}</h2>
                        <p class="author">
                        Author : ${data[idReturn].author}
                        <br />
                        Category : ${data[idReturn].category}
                        </p>
                        <p class="price">${data[idReturn].price} <span class="strikeout opa5">${data[idReturn].oldP}</span></p>
                        <br />
                        <div class="aboutContent">
                        <input type="checkbox" id="readMore" class="readMore" />
                        <p class="txtDesc">
                            ${data[idReturn].desc}
                        </p>
                        </div>
                        <div class="clickables mt1">
                        <button class="btn btn-simple ripple green" onclick="getBook()">
                            <i class="fas fa-book-open"></i> Get This Book
                        </button>
                        <button class="btn btn-simple dripple white" onclick="addToCart()">
                            <i class="fas fa-shopping-cart"></i>Add to Cart
                        </button>
                        </div>
                    </div>
            `;
                if (data[idReturn].desc.length >= 398) {
                    elem('readMore').style.display = 'block';
                }
                else {
                    elem('readMore').style.display = 'none';
                }
            } else if (idmatch === false) {
                shMsg(`<p class='sm-text'>There was a problem in getting the data ! <br /> Please Try again Later<br /><br />Please Wait a Second...</p>`);
                setTimeout(() => {
                    reDirect('home');
                    remMsg('messageBox');
                }, 2000);
            } else {
                shMsg(`<p class='sm-text'>There is no Book with this ID.. Please Wait</p>`);
                setTimeout(() => {
                    reDirect('home');
                    remMsg('messageBox');
                }, 2000);
            }
        })
        .catch(err => {
            shMsg("<p class='sm-text'>An unknown Error Occured.. <br /> PLease Try again Later or Contact to the Admin</p>")
            console.log(err);
        });

});
app.controller("cartCtrl", function ($rootScope, $scope) {
    remLoading();
    window.scrollTo(0, 0);

    $scope.checkoutPrice = countCART * 28.99;

    if (countCART <= 0) {
        elem('outputCART').innerHTML = `
        <p class="opa6" style="text-align: center;">Your Cart is Empty !</p>
        `;
        elem('CartINTERECT').style.display = 'none';

    } else {
        for (let c = 0; c <= countCART - 1; c++) {
            elem('outputCART').innerHTML += cartTemplate;
        }
    }

    if (loggedInn === false) {
        shMsg(dialogBox);
    }

    /* elem('EBOOK_P').addEventListener('click', function () {
         shMsg(`<p class="sm-text alert">Feature Not Availabe Right Now !</p> <br /> <p class="sm-text">Check <strong>My Books</strong> in the Menu <br> for Sample of EBOOK !</p>`);
    }); */
    elem('checkout_p').addEventListener('click', function () {
        shMsg(`<p class="sm-text opa9">Please Wait While You are being <br /> redirected to the Payment Gateway !</p>`);
        setTimeout(() => { window.open("https://paytm.com/", "_blank"); }, 2000);
        setTimeout(() => { remMsg('messageBox') }, 4000);
    });


});
app.controller("aboutCtrl", function ($scope) {
    remLoading();
    window.scrollTo(0, 0);


});
app.controller("searchCtrl", function ($scope, $routeParams) {
    remLoading();
    window.scrollTo(0, 0);
    $scope.searchName = $routeParams.searchName;


    /* This is for Search Suggestions */
    let searchSuggestionOutput = `
    <p class="sm-text opa8">
    Other Related Books
    </p>
    <br />
    <div class="grid g-one books">
    `;
    fetch('json/openBook.json')
        .then(res => {
            if (!res.ok) {
                shMsg("<p class='sm-text'>There was an problem in the Server.. <br /> PLease Try again Later</p>")
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            data.forEach(function (sugg) {
                searchSuggestionOutput +=
                    `
                    <div class="card">
                        <div class="image">
                        <img src="${sugg.img}" alt="Book" />
                        </div>
                        <div class="gText">
                        <h5>${sugg.title}</h5>
                        <p>
                            ${sugg.desc}
                        </p>
                        <p class="price">${sugg.price} <span class="strikeout opa5">${sugg.oldP}</span></p>
                        </div>
                        <div class="fh_center interect">
                        <button class="btn wide100 dripple" onclick='addToCart()'>
                            <i class="fas fa-cart-plus"></i>
                        </button>
                        <a href="#!/books/${sugg.id}" class="btn wide100 dripple">
                            <i class="fas fa-external-link-square-alt"></i>
                        </a>
                        </div>
                    </div>
                `;
            })
            searchSuggestionOutput += `</div>`;
            elem('searchSuggestions').innerHTML = searchSuggestionOutput;
            elem('searchSuggestions').classList.remove('dissCONT');
        })
        .catch(err => {
            shMsg("<p class='sm-text'>An unknown Error Occured.. <br /> PLease Try again Later or Contact to the Admin</p>")
            console.log(err);
        });

});
app.controller("myBooksCtrl", function ($rootScope, $scope) {
    remLoading();
    window.scrollTo(0, 0);

    /* Repeat the Recommended Books */
    let homeBooksOutput = '';
    fetch('json/openBook.json')
        .then(res => {
            if (!res.ok) {
                shMsg("<p class='sm-text'>There was an problem in the Server.. <br /> PLease Try again Later</p>")
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            data.forEach(function (sugg) {
                if (data.length > 0) {
                    homeBooksOutput +=
                        `
                        <div class="card">
                            <div class="image">
                            <img src="${sugg.img}" alt="Book" />
                            </div>
                            <div class="gText">
                                <h5>${sugg.title}</h5>
                                <p class="author">Author: ${sugg.author}</p>
                                <p class="price">Owned</p>                            
                            </div>
                            <div class="fh_center interect">
                                <a href="#!/pdfOpen" class="btn wide100 dripple">
                                    <strong style="margin-right: 4px; color: #505050;">Read Now </strong>
                                    <i class="fas fa-chevron-right"></i>
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    homeBooksOutput = `<p class="pageError">No Books Bought !</p>`;
                }
            })
            elem('myBooksCARD').innerHTML = homeBooksOutput;
            elem('myBooksCARD').classList.remove('dissCONT');
        })
        .catch(err => {
            shMsg("<p class='sm-text'>An unknown Error Occured.. <br /> PLease Try again Later or Contact to the Admin</p>")
            console.log(err);
        });

});
app.controller("pdfOpen", function ($scope) {
    remLoading();
    window.scrollTo(0, 0);

});
app.controller("profileCtrl", function ($scope) {
    remLoading();
    window.scrollTo(0, 0);

});
app.controller("errorCtrl", function ($scope) {
    remLoading();
    window.scrollTo(0, 0);

});
