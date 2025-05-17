/* Global Functions */
let elem = (elem) => {
    return document.getElementById(elem);
};
let $scope = elem => {
    return document.getElementById(elem).value;
};
/*===Logged State===*/
let loggedInn = true;
/*=================*/
function openNav() {
    elem("navBar").classList.add("rem_show");
}
function closeNAV() {
    elem("navBar").classList.add("rem_any");

    setTimeout(() => {
        elem("navBar").classList.remove("rem_show");
        elem("navBar").classList.remove("rem_any");
    }, 240);
}
elem("close_nav").addEventListener("click", function () {
    closeNAV();
});
let checkText = (textbox) => {
    let regex = /^[A-Za-z .,!&#0-9-=/:()'|*?\n]*$/;
    let value = textbox.value;
    let result = value.match(regex);

    // Cleaning the Textbox
    textbox.value = result;
};
let checkNum = (textbox) => {
    let regex = /^[0-9 +]*$/;
    let value = textbox.value;
    let result = value.match(regex);

    // Cleaning the Textbox
    textbox.value = result;
};
let checkEmail = (textbox) => {
    let regex = /^[A-Za-z0-9.@&/_-]*$/;
    let value = textbox.value;
    let result = value.match(regex);

    // Cleaning the Textbox
    textbox.value = result;
};

/* Random Global Messages */
let dialogBox = `
    <p class="sm-text opa6" style="margin-bottom: 5px;">You Have to Log In through an <br /> account to access This Feature !</p>
        <strong class="sm-text opa8">Do you want to Login ?</strong>
    <span class="fh_center msgInterect wide100">
        <button class="btn bsimple dripple opa6" onclick="remMsg('messageBox')">NO</button>
        <button class="btn bsimple ripple" onclick="window.location.href='login.html'">YES</button>
    </span>
`;
let cartTemplate = `
<div class="w90">
<div class="items">
  <div class="item">
    <div class="imgCont">
      <img src="resources/sampleBook.jpg" alt="Book" />
    </div>
    <div class="texts">
      <p class="title">
        Title of the Book Here It's Really BIG So ignore what am Writng
      </p>
        <p class="price"> $28.99 </p>
      <div class="quan fh_center">
      <label>Purchase Type</label>
      <select class='txtI'>
        <option value='E-Book'>E Book</option>
        <option value='Physical Copy'>Physical Copy</option>
      </select>
      </div>
      <div class="quan fh_center" style="margin-top: 2px;">
        <label>Quantity</label>
        <input
          type="number"
          class="txtQuantity"
          oninput="checkNumber(this)"
          value="1"
        />
        <div class="widebnn">
          <button class="btn plusB ripple red" onclick="shMsg('<p>Feature Not Available Right Now</p>'); ">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`;
let msgBox = document.getElementById('msgOut');
let HomePageBOOKS = `
<div class="grid g-one books">
    <div class="card">
        <div class="image">
            <img src="resources/sampleBook.jpg" alt="Book" />
        </div>
        <div class="gText">
            <h5>Title of the Book</h5>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                consectetur!
            </p>
            <p class="price">$28.87 <span class="strikeout opa5">$30.00</span></p>
        </div>
        <div class="fh_center interect">
            <button class="btn wide100 dripple re">
                <i class="fas fa-cart-plus"></i>
            </button>
            <a href="#!/books/Title of the Book" class="btn wide100 dripple">
                <i class="fas fa-external-link-square-alt"></i>
            </a>
        </div>
    </div>
</div>
`;
let advtBanner = `<img src="resources/navBar.jpg" alt="Advt" />`;
let colors = [
    "#d44a4a", "#27496d", "#7ebdb4",
    "#13293d", "#862a5c", "#fa744f",
    "#0779e4", "#8785a2", "#400082",
    "#fe346e", "#c02739", "#464159",
    "#c9485b", "#ffa41b", "#7fcd91",
    "#f3ae4b", "#ae7c7c", "#323232"
];

/* Function For Repeating of Any Array (Here the Color is Repeating !)*/
function repeatArray(jora) {
    let outputARR = [];
    let outARRcount = 0;
    for (let u = 1; u <= jora[0]; u++) {
        for (let i = 0; i <= jora[1] - 1; i++) {
            outputARR[outARRcount] = jora[2][i];
            outARRcount += 1;
        };
    };
    return outputARR;
};
/* Function for Calculating Sets of Colors That need to be repeated */
function defineSets(num, array_var) {
    let set = 1;
    let preSet = array_var.length;
    const preS = preSet;
    for (let s = 1; s <= num - 1; s++) {
        if (s == preSet) {
            set += 1;
            preSet += preS;
        }
    };
    let output = [set, preS, array_var];
    return output;
}
/* Function for Calling the above two functions for Category Auto-generate Colors */
function categoryColors(num) {
    let output = repeatArray(defineSets(num, colors));
    return output;
}

/* Funciton for Cookie Handle */
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(cname) {
    var user = getCookie(cname);
    if (user != "") {
        return true;
    } else {
        return false;
    }
}

/* Custom Data For LINK in JS */

let cusDs = document.querySelectorAll('.datalink');

for (let i = 0; i <= cusDs.length - 1; i++) {
    if (cusDs[i].getAttribute("data-relocate")) {
        cusDs[i].addEventListener('click', () => {
            window.location.href = cusDs[i].getAttribute("data-relocate");
        });
    }
}

/* Custom Data For LINK in JS END */

function reDirect(url) {
    window.location.href = "#!/" + url;
}
function closeSearch() {
    let header = document.getElementById('header');
    header.classList.remove('searchShow');
};

function showMSG(el) {
    elem(el).classList.add('msgShow');
}
function remMsg(el) {
    elem(el).classList.remove('msgShow');
}
function changeMSG() {
    msgBox.innerHTML = dialogBox;
    showMSG('messageBox');
}

function openSearch() {
    let header = document.getElementById('header');
    if (header.className !== "searchShow") {
        header.classList.add('searchShow');
        setTimeout(() => {
            elem('txtSearch').focus();
        }, 100)
    } else {
        if (elem('txtSearch').value === "" || elem('txtSearch').value === null) {
            document.getElementById('msgOut').innerHTML = `
                <p class="sm-text alert">Please Enter Something To Search !<p>
            `;
            showMSG('messageBox');
            setTimeout(() => {
                remMsg('messageBox');
                elem('txtSearch').focus();
            }, 2000);
        }
        else {
            reDirect('search/' + elem('txtSearch').value);
        }
    }

};
function remLoading() {
    setTimeout(() => {
        remMsg('loading')
    }, 100);
}
function shMsg(msg) {
    msgBox.innerHTML = msg;
    showMSG('messageBox');
}
/* Count is the Cart Items */
let countCART = 0;
function addToCart() {
    if (loggedInn === true) {
        let noti = elem('cartFull');
        noti.classList.add('noti');
        countCART += 1;
        noti.setAttribute('data-noti', countCART);
    } else if (loggedInn === false) {
        shMsg(dialogBox);
    }
    else {
        shMsg("<p class='sm-text alert'>There was a problem ! <br /> Please Contact to the Developers...</p>");
    }
}
function checkCart() {
    let noti = elem('cartFull');
    if (countCART > 0) {
        noti.classList.add('noti');
        noti.setAttribute('data-noti', countCART);
    } else if (countCART == 0) {
        noti.classList.remove('noti');
        noti.setAttribute('data-noti', countCART);
    }
}
function openCart() {
    if (countCART > 0) {
        reDirect("cart");
    }
    else {
        shMsg("Cart is Empty !");
        setTimeout(() => {
            remMsg('messageBox');
        }, 4000);
    }
}
function checkNumber(text) {
    let regex = /^[0-9 +]*$/;
    let value = text.value;
    let result = value.match(regex);

    // Cleaning the Textbox
    text.value = result;
}
function msgg(msg) {
    shMsg('<p class="sm-text alert">' + msg + ' is selected !<p>');
}
function $http_get(urlLink) { return fetch(apiUrl + urlLink) };
function $http_post(urlLink, datas) {
    return fetch(apiUrl + urlLink, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datas)
    })
};
function openMyBooks() {
    if (loggedInn === true) {
        reDirect('mybooks');
    } else if (loggedInn === false) {
        shMsg(dialogBox);
    }
    else {
        shMsg("<p class='sm-text alert'>There was a problem ! <br /> Please Contact to the Developers...</p>");
    }
};
function getBook() {
    if (loggedInn === true) {
        countCART += 1;
        reDirect('cart');
        checkCart();
    } else if (loggedInn === false) {
        shMsg(dialogBox);
    }
    else {
        shMsg("<p class='sm-text alert'>There was a problem ! <br /> Please Contact to the Developers...</p>");
    }
};
/* Validation Check in Search Box */
elem('txtSearch').addEventListener('input', () => {
    checkText(elem('txtSearch'));
});
elem('txtSearch').addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        btnSearch.click();
    }
});

