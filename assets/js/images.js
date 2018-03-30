module.exports = () => {
  const cloudinary = require('cloudinary-core');

  const cl = new cloudinary.Cloudinary({cloud_name: "creative-distillery", secure: true});

  const images = document.querySelectorAll('[data-url]');

  images.forEach((image) => {
    const url = image.getAttribute('data-url');
    const format = image.getAttribute('data-format') || 'auto';
    if (url) {
      image.src = cl.url(url,
        {
          transformation: [
            {width: 300, gravity: 'face', crop: 'thumb'},
            {overlay: 'circle-mask-2', width: 300}
          ],
          fetchFormat: format,
          type: 'fetch'
        }
      );
    }
  });
}
