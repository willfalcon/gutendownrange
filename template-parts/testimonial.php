<section class="testimonial">

  <h3 class="page-title color-white">
    <span class="line"></span>
    <span class="text"><?php the_sub_field( 'heading' ); ?></span>
    <span class="line"></span>
  </h3>

  <div class="testimonial__content">

    <?php the_sub_field( 'main_content' ); ?>

  </div>

  <div class="testimonial__source">

    <?php $img = get_sub_field( 'photo' ); ?>
    <?php if ( $img ) : ?>
      <img class="testimonial__source-image" data-url="<?php echo $img['url']; ?>" data-format="png" src="<?php echo $img['sizes']['medium']; ?>" alt="<?php echo $img['alt']; ?>" />
    <?php endif; ?>
    <?php if ( get_sub_field( 'under_photo_content' ) ) : ?>
      <?php the_sub_field( 'under_photo_content' ); ?>
    <?php endif; ?>
    <?php if ( get_sub_field( 'name' ) ) : ?>
      <h5 class="testimonial__name"><?php the_sub_field( 'name' ); ?></h5>
    <?php endif; ?>
    <?php if ( get_sub_field( 'title' ) ) : ?>
      <p class="testimonial__title"><?php the_sub_field( 'title' ); ?></p>
    <?php endif; ?>

  </div>
<!--
<script type="text/javascript">
  var clTestimonial = new cloudinary.Cloudinary({cloud_name: "creative-distillery", secure: true});

  var testimonialImage = document.querySelector('.testimonial__source-image');
  var testimonialImageUrl = testimonialImage.getAttribute('data-url');

  if (testimonialImageUrl) {
    testimonialImage.src = clTestimonial.url(testimonialImageUrl,
      {
        width: 300,
        height: 300,
        gravity: 'face',
        crop: 'thumb',
        radius: 'max',
        format: 'png',
        type: 'fetch',
      }
    );
  }

</script> -->

</section>
