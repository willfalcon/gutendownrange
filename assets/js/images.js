module.exports = () => {
  const cloudinary = require('cloudinary-core');

  const cl = new cloudinary.Cloudinary({cloud_name: "creative-distillery", secure: true});

  const images = document.querySelectorAll('[data-url]');
  
  images.forEach((image) => {
    const url = image.getAttribute('data-url');
    if (url) {
      image.src = cl.url(url,
        {
          transformation: [
            {width: 300, gravity: 'face', crop: 'thumb'},
            {overlay: 'circle-mask-2', width: 300}
          ],
          fetchFormat: 'auto',
          type: 'fetch'
        }
      );
    }
  });
}
