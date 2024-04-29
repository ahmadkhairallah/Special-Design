// check if there is local storage color option
let maincolors = localStorage.getItem("color_option");

if (maincolors !== null) {
  //  console.log('local storage is not empty you can set it on root now');
   // console.log(localStorage.getItem("color_option"));

   document.documentElement.style.setProperty('--main-color', maincolors);

   // remove active class from all colors list item
   document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");

    // add active class on element with data-color === local storage item
    if (element.dataset.color === maincolors) {
        // add active class
        element.classList.add ("active");
    }
   });
} 

// random background option
let backgroundoption = true;

// variable to control the background interval 
let backgroundtheinterval ;

// check if there is local storage random background item
let backgroundlocalitem = localStorage.getItem("background-option");

// chech if random background local storage is not empty 
if (backgroundlocalitem !== null) {

    if (backgroundlocalitem === 'true') {
        backgroundoption = true;
    } else {
        backgroundoption = false;
    }

   // remove active class from all spans 
   document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("remove");
   });

   if (backgroundlocalitem === 'true') {
    document.querySelector(".random-background .yes").classList.add("active");

   }else {
    document.querySelector(".random-background .no").classList.add("active");

   }
}

// toggle apin class icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // toggle class fa-spin for reaction on self
    this.classList.toggle("fa-spin");

    // toggle class open on main
    document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsList = document.querySelectorAll(".colors-list li");

// loop on all list items
colorsList.forEach(li => {

    //click on every items
    li.addEventListener("click", (e) => {
        console.log(e.target.dataset.color);

        // set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color on local storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        handleactive(e);
    });
});

// switch random background option 
const randomBackEl = document.querySelectorAll(".random-background span");

// loop on all spans
randomBackEl.forEach(span => {

    //click on every span
    span.addEventListener("click", (e) => {
       

        handleactive(e);

        if (e.target.dataset.background === 'yes') {
            
            backgroundoption = true;
            
            randomizeimgs();

            backgroundlocalitem.setItem("background-option", true);

        } else {
            backgroundoption = false;

            clearInterval(backgroundtheinterval);

            backgroundlocalitem.setItem("background-option", false);
            
        }

    });
});

// select landing page element 
let landingPage = document.querySelector(".landing-page");

// get array of imgs 
let imgarray = ["code-1839406_1280.jpg", "laptop-2620118_1280.jpg", "web-design-2906159_1280.jpg", "workspace-1280538_1280.jpg", "cup-of-coffee-1280537_1280.jpg"];

// change background image url 
landingPage.style.backgroundImage = 'url("imgs/cup-of-coffee-1280537_1280.jpg")';


// function to randomize imgs 
function randomizeimgs () {

    if (backgroundoption === true) {

       backgroundtheinterval = setInterval(() => {

            // get random number 
        let randomNumber = Math.floor(Math.random() * imgarray.length);
        
        // change background image url
        landingPage.style.backgroundImage = 'url("imgs/' + imgarray[randomNumber] +'")';
        
        
        },3000);
    }
}

randomizeimgs() ;

// select skills selector 
let ourskills = document.querySelector(".skills");
 
window.onscroll = function () {

    // skills offset top 
    let skillsoffsettop = ourskills.offsetTop;

    // skills outer hieght 
    let skillsouterheight = ourskills.offsetHeight;

    // window height 
    let windowheight = this.innerHeight;

    // window scrollTop 
    let windowscrollTop = this.pageYOffset;

    if (windowscrollTop > (skillsoffsettop + skillsouterheight - windowheight)) {
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");

        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

//  create popup with the image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // create overlay element
        let overlay = document.createElement("div");

        // add class to overlay 
        overlay.className = 'popup-overlay';

        // append overlay to the body
        document.body.appendChild(overlay); 

        // create the popup box
        let popupbox = document.createElement("div");

        // add class to popupbox 
        popupbox.className = 'popup-box';

        if (img.alt != null) {

            // create heading
            let imgheading = document.createElement("h3");

            // create text for heading 
            let imgtext = document.createTextNode(img.alt);

            // append the text to the heading
            imgheading.appendChild(imgtext);

            // append the heading to the popup box
            popupbox.appendChild(imgheading);
        }

        // create the image 
        let popupimage = document.createElement("img");

        // set image source 
        popupimage.src = img.src;

        // add image to popup box
        popupbox.appendChild(popupimage);

        //append the popup box to body
        document.body.appendChild(popupbox);

        // create close span
        let closebutton = document.createElement("span");

        // create the close button text 
        let closebuttontext = document.createTextNode("X");

        // append text to close button
        closebutton.appendChild(closebuttontext);

        // add class to close button 
        closebutton.className = 'close-button';

        // add close button to the popup box
        popupbox.appendChild(closebutton);

    });
});

// close popup 
 document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {

        // remove the current popup 
        e.target.parentNode.remove();

        // remove overlay 
        document.querySelector(".popup-overlay").remove();
    }
 });

 // select all bullets
 const allbullets = document.querySelectorAll(".nav-bullets .bullet");

 // select all bullets
 const allLinks = document.querySelectorAll(".landing-page .links li");


 function scrolltosomewhere(element) {

    element.forEach(ele => {

        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        });
     });
 }

 scrolltosomewhere (allLinks);
 scrolltosomewhere (allbullets);

 // handle active state 
 function handleactive (ev) {

    // remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove(".active");

    });    

        // add active class on self
        ev.target.classList.add("active");
    
 }

 let bulletsSpan = document.querySelectorAll(".bullets-option span");

 let bulletsContainer = document.querySelector(".nav-bullets");

 let bulletlocalitem = localStorage.getItem("bullets-option");

 if (bulletlocalitem !== null) {
     
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletlocalitem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add(".active");
    } else {
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add(".active");

    }
 }
 bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullet-option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }
        handleactive(e);
    });
 });
 

 // reset bottun 
 document.querySelector(".reset-option").onclick = function() {
    localStorage.clear();
    window.location.reload();
 };

 // toggle menu 
 let togglebtn = document.querySelector(".toggle-menu");
 let tlinks = document.querySelector(".links");

 togglebtn.onclick = function (e) {

    // stop propagation 
    e.stopPropagation();

    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
 };

 // click anywhere outside menu and toggle button
 document.addEventListener("click", (e) => {

    if (e.target != togglebtn && e.target != tlinks) {

        // check if menu is open
        if (tlinks.classList.contains("open")) {

            // toggle class menu active on button
            togglebtn.classList.toggle("menu-active");
            
            // toggle class open on links
            tlinks.classList.toggle("open");
        }

    }
 });

 // stop prpagation on menu 
 tlinks.onclick = function (e) {
    e.stopPropagation();
 }