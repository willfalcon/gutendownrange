jQuery(document).ready(function() {

  var cl = new cloudinary.Cloudinary({cloud_name: "creative-distillery", secure: true});

  var images = document.querySelectorAll('.staff-member__image');
  for (var image of images) {
    var url = image.getAttribute('data-url');
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
  }


});
