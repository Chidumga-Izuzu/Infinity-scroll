// initialize image container

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];




const count = 30;
const apiKey = '0RZVH79SxufrmIHiUl3NRh0H1119skZrg84-C6XIXyw';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images have loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden=true;
        console.log('ready =', ready);
    }
}

function setAttributes(element, attributes) {
for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
}

}



// Create Elements For Links & Photos, and add to DOM

function displayPhotos() {
    imagesLoaded=0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);

    // Run Function for each object in photosArray

    photosArray.forEach((photo) => {

        // create anchor tag to link to Unsplash

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',



        });

        // create <img> for photo

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,



        });
        
        img.addEventListener('load', imageLoaded)

        // put image in <a> and then put inside image container

        item.appendChild(img);
        imageContainer.appendChild(item);

    });


    }

// fetch photos from unsplash API

async function getPhotos () {

    try {

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        

    } catch (error) {
        // Catch Error
    }
}

// Check to see if scrolling is near end button, and load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
{

ready = false;
getPhotos();


}


});
// RUN ON LOAD
getPhotos();