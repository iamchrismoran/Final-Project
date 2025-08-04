// GLOBAL VARIABLES
let pixelDivsArray = [];
let pixelColor = "rgb(255,255,255)";

const newColor = document.getElementById("pickAColor");

const pixelSize = document.getElementById("pixelSize");
const columns = document.getElementById("columns");
const rows = document.getElementById("rows");

let savedPicture; // where the JSON structure for the creatuon will store

// we need listeners for when the pixel size or dimensions are changed.
if (pixelSize) { pixelSize.addEventListener("change", updateGrid);}
if (columns) {columns.addEventListener("change", updateGrid);}
if (rows) {rows.addEventListener("change", updateGrid);}

if (newColor) {newColor.addEventListener("change", handleClickOnSquare);}

let messages = {"index":"Make great art!", "gallery":"You've made great art!!", "instructions":"Let me help you with that","about":"So, about the things missing or not working..."};

// which page are we on so we can obscure/alter the navigation for that page when on it
let url = window.location.pathname;
let link = "index";
const lastSlashIndex = url.lastIndexOf('/');
if (lastSlashIndex === -1 || url === "/") {
    // No slash found, return the entire string
    link = "index";
    //console.log(link);
} else {
    // Return the substring starting from after the last slash
    link = url.substring(lastSlashIndex + 1).slice(0, -5);
    //console.log(link);
}
const hereNow = document.getElementById(link);
//hereNow.style.backgroundColor = "black";
hereNow.style.boxShadow = "2px 2px 2px black";
hereNow.style.fontSize = ".6em";
hereNow.style.padding = ".5em 1em";

const thisPage = document.getElementById(link);
const thisLink = thisPage.querySelector("a");
thisLink.style.color = "white";
thisLink.style.backgroundColor = "black";

console.log(messages[link]);

//document.getElementById(link).style.fontsize = "5px";
if (link == "index") link = "create";
document.getElementById("topTitle").textContent = "Make Pixel Art - " + link.charAt(0).toUpperCase() + link.slice(1);

// Draw the grid
function drawGrid(x, y, savedColors) {
    if (!savedColors) savedColors = {};

    var grid = document.getElementById("pixelGrid");
    grid.innerHTML = "";

    // Set grid structure and width (no template literals)
    grid.style.gridTemplateColumns = "repeat(" + y + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + x + ", 1fr)";
    var size = parseInt(pixelSize.value);
    if (size <= 0) {size = 1;}


    for (var i = 1; i <= x; i++) {
        for (var j = 1; j <= y; j++) {
            var pixel = document.createElement("div");
            pixel.id = "pixel-" + i + "-" + j;
            pixel.className = "pixel";

            pixel.style.width = size + "px";
            pixel.style.height = size + "px";

            var key = i + "," + j;
            var color = savedColors[key] || "rgb(255,255,255)";
            pixel.style.backgroundColor = color;

            pixel.addEventListener("click", handleClickOnSquare);

            grid.appendChild(pixel);
        }
    }
    drawMinimap(x, y, savedColors);

}

    // Handle clicks on pixels
    function handleClickOnSquare(event) {
        const clickedSquare = event.target;
        const currentColor = window.getComputedStyle(clickedSquare).backgroundColor;

        // Convert hex (#rrggbb) to RGB string
        const selectedHex = newColor.value;
        const dummy = document.createElement("div");
        dummy.style.backgroundColor = selectedHex;
        document.body.appendChild(dummy);
        const selectedRGB = window.getComputedStyle(dummy).backgroundColor;
        document.body.removeChild(dummy);


        //console.log("Current:", currentColor, "Selected:", selectedRGB);

        if (currentColor === selectedRGB) {
            clickedSquare.style.backgroundColor = "white";
        } else {
            clickedSquare.style.backgroundColor = selectedRGB;
        }
        drawMinimap(parseInt(rows.value), parseInt(columns.value), savePixelColors(parseInt(rows.value),parseInt(columns.value)));


    }

    // Update the grid when changes to size and dimensions are entered
    function updateGrid() {
        const width = parseInt(columns.value);
        const height = parseInt(rows.value);

        let saved = savePixelColors(parseInt(rows.value),parseInt(columns.value));
        drawGrid(height, width, saved);
        drawMinimap(height, width, saved);


    }

    // get the grid state to save when resized or shared
    function getCurrentGridState(){
        const state = [];
        for (let i = 0; i < pixelDivsArray.length; i++){
            state.push(pixelDivsArray[i].style.backgroundColor || "white");
        }
        return state;
    }


    // get proper array ordered grid state
function savePixelColors(xMax, yMax) {
    const savedColors = {};
    for (let x = 1; x <= xMax; x++) {
        for (let y = 1; y <= yMax; y++) {
            const id = "pixel-" + x + "-" + y;
            const pixel = document.getElementById(id);
            if (pixel) {
                savedColors[`${x},${y}`] = window.getComputedStyle(pixel).backgroundColor;
            }
        }
    }

    const artTitleInput = document.getElementById("artName");
    const artTitle = artTitleInput.value.trim();
    let saveKey = artTitle || "__unnamed";

    let allSaves = JSON.parse(localStorage.getItem("pixelArtSaves")) || {};
    const newPiece = {
        "title": artTitle || "Untitled",
        "pixels": savedColors
    };
    //console.log("saveKey " + saveKey + " allSaves " + JSON.stringify(allSaves));

    if (artTitle === "") {
        // Save or replace the unnamed work
        allSaves["__unnamed"] = newPiece;
        //console.log("Unnamed art saved.");
    } else {
        // Check if this art matches unnamed saved art
        if (
            allSaves["__unnamed"] &&
            JSON.stringify(allSaves["__unnamed"].pixels) === JSON.stringify(savedColors)
        ) {
            // Rename unnamed art to new title
            delete allSaves["__unnamed"];
        }
        // Save or update the named art
        allSaves[artTitle] = newPiece;
        //console.log(`Art saved as "${artTitle}"`);
    }

    localStorage.setItem("pixelArtSaves", JSON.stringify(allSaves));
    //console.log(newPiece);
    return savedColors;
}

/*
Section for making the mini version of the current creation that can have its
visibility toggled on and off, updating its design in real time.
*/
// make a mini version of the current grid state for a "bird's eye" preview
function drawMinimap(rows, cols, savedColors) {
    let minimap = document.getElementById("minimap");
    if (!minimap) {
        minimap = document.createElement("div");
        minimap.id = "minimap";
        minimap.classList.add("minimap");
        document.body.appendChild(minimap);
    }

    minimap.innerHTML = "";
    minimap.style.setProperty('--cols', cols);
    minimap.style.setProperty('--rows', rows);
    minimap.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    minimap.style.gridTemplateRows = "repeat(" + rows + "}, 1fr)";

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const pixel = document.createElement("div");
            pixel.className = "minipixel";

            const key = i + "," + j;
            const color = savedColors[key] || "rgb(255,255,255)";
            pixel.style.backgroundColor = color;
            minimap.appendChild(pixel);
        }
    }
}
function toggleMinimap() {
    const minimap = document.getElementById("minimap");
    if (minimap.classList.contains("hidden")) {
        const height = parseInt(rows.value);
        const width = parseInt(columns.value);
        const saved = savePixelColors(height, width);
        drawMinimap(height, width, saved);
        minimap.classList.remove("hidden");
    } else {
        minimap.classList.add("hidden");
    }
}

/*
Section for making creating thumbnail version of all the creations 
stored in localStorage and displaying them in a flex layoput gallery
*/   

// on gallery page, when loaded it should comb through the localStorage looking for saved work and create a gallery display of clickable images that link to the "Create"/index page to be further edited.
function populateGallery(){
        const savedGallery = JSON.parse(localStorage.getItem("pixelArtSaves")) || {};

        for (const title in savedGallery) {
            if (savedGallery.hasOwnProperty(title)){
                //console.log("Title", title);
                thisPictureObj = savedGallery[title].pixels;
                let maxX = 0;
                let maxY = 0;

                Object.keys(thisPictureObj).forEach(key => {
                    const [x,y] = key.split(",").map(Number);
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                });
                //console.log("Dimensions: " + maxX + " x " + maxY + " Pixel: " + thisPictureObj);
                thumbnailMaker(maxX, maxY, thisPictureObj, title);
            }
        }
}

// make a mini version of the current grid state for a "bird's eye" preview
function thumbnailMaker(rows, cols, savedColors, title) {
    const galleryHouse = document.getElementById("galleryHouse");

    // Create a fieldset to contain the thumbnail and title
    const fieldset = document.createElement("fieldset");
    fieldset.className = "thumbnail";

    // Add a legend as the title
    const legend = document.createElement("legend");
    legend.textContent = title || "Untitled";
    if (title === "__unnamed") {legend.textContent = "Untitled";}
    fieldset.appendChild(legend);

    // Create the thumbnail grid
    const grid = document.createElement("div");
    grid.className = "thumbnailGrid"; 
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(" + cols +", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + rows +", 1fr)";

   for (let y = 1; y <= rows; y++) {
    for (let x = 1; x <= cols; x++) {
        const key = y + "," + x;
        const color = savedColors[key] || "rgb(255,255,255)";
        const pixel = document.createElement("div");
        pixel.className = "thumbnailpixel";
        pixel.style.backgroundColor = color;
        grid.appendChild(pixel);
  }
}

    //link to load this thumbnail to the create page for editing (botom left)
    const loadLink = document.createElement("a");
    loadLink.href = "index.html?title=" + encodeURIComponent(title);
    loadLink.innerHTML="<img src='brushcursor.png' alt='Edit'>";
    loadLink.className="thumb-link";

    // Delete link (bottom-right)
    const deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.textContent = "❌";
    deleteLink.className = "thumb-link";
    deleteLink.addEventListener("click", (e) => {
        e.preventDefault();
        const confirmDelete = confirm("Are you sure you want to delete " + title +"?");
        if (confirmDelete){
        const saved = JSON.parse(localStorage.getItem("pixelArtSaves")) || {};
        delete saved[title];
        localStorage.setItem("pixelArtSaves", JSON.stringify(saved));
        fieldset.remove();
        }
    });

    const linkWrapper = document.createElement("div");
    linkWrapper.className = "thumb-links";
    linkWrapper.appendChild(loadLink);
    linkWrapper.appendChild(deleteLink);

    // Append grid, edit and delete links to fieldset
    fieldset.appendChild(grid);
    fieldset.appendChild(loadLink);
    fieldset.appendChild(deleteLink);
    galleryHouse.appendChild(fieldset);
}

/* 
Set event listeners for the buttons on the create page and input. They are wrapped in a DOMContentLoaded to make sure the content loads before they act. Many have checks to make sure the elements we're listening for exist (many are only on one page.)
*/
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("toggleMinimapLink")){
        document.getElementById("toggleMinimapLink").addEventListener("click", function (event) {
        event.preventDefault();
        toggleMinimap();
        });
    }

    if (document.getElementById("clearAll")){
        document.getElementById("clearAll").addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("artName").value = "";
            drawGrid(parseInt(rows.value), parseInt(columns.value));
        });
    }

    if (document.getElementById("artName")){
        document.getElementById("artName").addEventListener("change", function() {
            const newTitle = this.value.trim();
            if (newTitle !== "") {
                updateGrid();
            }
        });
    }

    if (document.getElementById("columns")){
        document.getElementById("columns").addEventListener("change", function() {
                updateGrid();
        });
    }

    if (document.getElementById("rows")){
        document.getElementById("rows").addEventListener("change", function() {
                updateGrid();
        });
    }

    if (document.getElementById("print")){
        document.getElementById("print").addEventListener("click", function() {
            window.print();
        });
    }

    const fonts = ["Amarante, sans-serif", "Arial, Helvetica, sans-serif", "'Times New Roman', Times, serif", "cursive", "fantasy", "monospace"];
    let fontNum = parseInt(localStorage.getItem("fontNum")) || 0;

    document.body.style.fontFamily = fonts[fontNum];

    const fontLink = document.getElementById("fontchange");
    if (fontLink) {
        fontLink.addEventListener("click", function (event) {
            event.preventDefault();
            fontNum = (fontNum + 1) % fonts.length;
            localStorage.setItem("fontNum", fontNum);
            document.body.style.fontFamily = fonts[fontNum];
        });
    }
});
    
