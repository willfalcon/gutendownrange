module.exports = () => {
  const cloudinary = require('cloudinary-core');

  const cl = new cloudinary.Cloudinary({cloud_name: "creative-distillery", secure: true});

  const images = document.querySelectorAll('[data-url]');

  images.forEach((image) => {
    const url = image.getAttribute('data-url');
    const format = image.getAttribute('data-format') || 'auto';
    const mask = image.getAttribute('data-mask') ? {
      overlay: 'circle-mask-2',
      width: 300
    } : '';
    const radius = image.getAttribute('data-mask') ? '' : 'max';
    if (url) {
      image.src = cl.url(url,
        {
          transformation: [
            {
              width: 300,
              gravity: 'face',
              crop: 'thumb',
              radius
            },
            mask
          ],
          format: format,
          type: 'fetch'
        }
      );
    }
  });
}
