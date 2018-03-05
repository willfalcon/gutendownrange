<section class="testimonial">

  <h3 class="page-title color-white">
    <span class="line"></span>
    <span class="text"><?php the_sub_field( 'title' ); ?></span>
    <span class="line"></span>
  </h3>

  <div class="testimonial__content">

    <?php the_sub_field( 'main_content' ); ?>

  </div>

  <div class="testimonial__source">

    <?php $img = get_sub_field( 'photo' ); ?>
    <?php if ( $img ) : ?>
      <img class="img-fluid" src="<?php echo $img['sizes']['medium']; ?>" alt="<?php echo $img['alt']; ?>" />
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

</section>
