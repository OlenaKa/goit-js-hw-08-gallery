import galleryItems from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox'); 
const imageModalRef = document.querySelector('.lightbox__image');
const btnColseModalRef = document.querySelector('button[data-action="close-lightbox"]');

const modalOverlayRef = document.querySelector('.lightbox__overlay');


function createGalleryElement (galleryItems) {

 return galleryItems.map((({preview, original, description})=>{
    return `<li class="gallery__item">
    <a class="gallery__link" href="${preview}">
    <img class="gallery__image lazyload" data-src="${preview}" data-source="${original}" alt="${description}" loading="lazy" width="340px" height="240px"/>
    </a>
    </li> `
  }
    )).join('');
  
   
}
galleryListRef.innerHTML =createGalleryElement(galleryItems) ;



if ('loading' in HTMLImageElement.prototype) {
  addSrcAttr()
} else {
  addScriptLazyLoading()
}

function addSrcAttr () {
  const imagesRef = document.querySelectorAll('img[loading="lazy"]');
  console.log(imagesRef)
  imagesRef.forEach(image => {
    image.src=image.dataset.src;
   
  });
}

function addScriptLazyLoading (){
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js';
  document.body.appendChild(script);
}



galleryListRef.addEventListener('click', onImageClick);

btnColseModalRef.addEventListener('click', closeModal);

modalOverlayRef.addEventListener('click', closeModal);

document.addEventListener('keydown', closeModalOnEsc);

document.addEventListener('keydown', slideImages)

function onImageClick (e) {
 e.preventDefault();

 if (e.target.nodeName === 'A') {
  e.preventDefault();
 }
  if (!e.target.classList.contains('gallery__image')){
  
   return;
  } 

    const image = e.target
  modalRef.classList.add('is-open');
  imageModalRef.alt = image.alt
 imageModalRef.src=image.dataset.source
  
  
}

function closeModal () {
  modalRef.classList.remove('is-open');
  imageModalRef.setAttribute('src', '');
  imageModalRef.setAttribute('alt', '')
}

function closeModalOnEsc (e) {
  if(e.keyCode === 27 ){
   closeModal();
   }
 
}

function slideImages (e) {
 
  let currentImgSrcObj = galleryItems.find(({description,})=>description === imageModalRef.getAttribute('alt'))
  
  let currentImgIndex = galleryItems.indexOf(currentImgSrcObj)
 
  let nextImgIndex = currentImgIndex<galleryItems.length-1 ? currentImgIndex+1 : 0;
  
  let prevImgIndex = currentImgIndex!==0 ? currentImgIndex-1 : galleryItems.length-1

  let nextImgSrcRef = galleryItems[nextImgIndex].original
  
  let nextImgAltRef = galleryItems[nextImgIndex].description
  let prevtImgSrcRef = galleryItems[prevImgIndex].original
  let prevImgAltRef = galleryItems[prevImgIndex].description   
 

 if (e.keyCode === 39) {
  imageModalRef.setAttribute('src', `${nextImgSrcRef}`)
  imageModalRef.setAttribute('alt', `${nextImgAltRef}`)
}

 if (e.keyCode === 37) {
  imageModalRef.setAttribute('src', `${prevtImgSrcRef}`)
  imageModalRef.setAttribute('alt', `${prevImgAltRef}`)
 }


}

