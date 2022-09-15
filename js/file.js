
var memoryGameContainer = document.getElementById("memory-game");
var images = [
    "html.jpg", 
    "css.jpg", 
    "javascript.png", 
    "sass.png", 
    "bootstrap.png", 
    "react.png", 
    "angular.png", 
    "gulp.png",
    "vue.png",
    "jquery.jpg"];


// Duplicate The Array Instead Of Rewriting The Images
function duplicateArray() {
    images.push(...images.copyWithin(10, 0, images.length - 1))
}

duplicateArray();

// Randomize Function 
function randomizeArray(imgs) {
    for (var x=0; x<imgs.length; x++) {
        var randomImage = Math.floor(Math.random() * (x + 1));
        var temp = imgs[x];
        imgs[x] = imgs[randomImage];
        imgs[randomImage] = temp;
    }
}

randomizeArray(images);

// Add Random Image Every Time
function addImages() {
    for (let x=0; x<images.length; x++) {
    memoryGameContainer.innerHTML += `
        <div class="single-card rotate">
            <div class="front">
                <i class="fa-sharp fa-solid fa-question"></i>
            </div>
            <div class="back">
                <img src="./images/${images[x]}" alt="icon"/>
            </div>
        </div>
    `;
    }
}

addImages();

// Rotate Images On Start
var imagesBlocks = document.querySelectorAll(".single-card");

function rotateImages() {
    imagesBlocks.forEach(function(elem) {
        elem.classList.remove("rotate");
    })
};

window.setTimeout(rotateImages, 700);

// Flip On Click Function
var wrong = right = 0;
var remaining = 10;
let flipArray = [];
var resultsDiv = document.getElementById("results");

// Add Remaining Targets
resultsDiv.children[2].children[0].innerHTML = `${remaining} / ${remaining}`

imagesBlocks.forEach(function(block) {
    block.addEventListener("click", function(e) {
        e.target.parentElement.parentElement.classList.add("flip");
        flipArray.push(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.style.pointerEvents = "none";

        // Check On Array Of Flipped Cards
        if (flipArray.length == 2) {
            if (flipArray[0].children[1].children[0].src == flipArray[1].children[1].children[0].src) {
                // Add Right Click Targets
                right++;
                resultsDiv.children[1].children[0].innerHTML = right;
                // Calculate Remaining
                resultsDiv.children[2].children[0].innerHTML = `${remaining - right} / ${remaining}`;
                // Return Array To Default
                flipArray.splice(0);
            }
            else {
                // Add Wrong Click Targets
                wrong++;
                resultsDiv.children[0].children[0].innerHTML = wrong;
                // Get Pointer Events Working Again if Wrong And Flip Them
                flipArray.forEach(function(elem) {
                    elem.style.pointerEvents = "all";
                    window.setTimeout(function() {
                        elem.classList.add("animation")
                    }, 600);
                    window.setTimeout(function() {
                        elem.classList.remove("flip");
                        elem.classList.remove("animation");
                    }, 1200);
                });
                flipArray.splice(0);
            }
        }
        if (right == remaining) {
            // Add Overlay Div
            var mainDiv = document.getElementById("main");
            var addOverlay = document.createElement("div");
            var overlayAttr = document.createAttribute("class");
            overlayAttr.value = "overlay";
            addOverlay.setAttributeNode(overlayAttr);
            mainDiv.insertBefore(addOverlay, mainDiv.children[0]);

            // Reload The Page Again
            window.setTimeout(function() {
                window.alert("Congratulations, You've Succeeded");
            }, 0)
            window.location.reload();
        }
    })
});

// Reset Results
var button = document.querySelector("#button button");

button.addEventListener("click", function() {
    window.location.reload();
});