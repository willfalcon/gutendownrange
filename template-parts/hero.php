  <?php
    $hero_img = get_sub_field( 'image' );
  ?>
  <div class="hero">
    <?php $img_align = get_sub_field( 'image_alignment' ); ?>
    <img class="hero-image<?php if ( $img_align ) { echo ' align-' . $img_align; } ?>" src="<?php echo $hero_img['sizes']['large']; ?>" alt="<?php $hero_img['alt']; ?>" />
    <img class="hero-bottom" src="<?php echo get_template_directory_uri(); ?>/assets/img/hero-bottom.svg"/>

    <h1 class="hero__heading"><?php echo get_sub_field( 'heading' ) ? get_sub_field( 'heading' ) : get_the_title(); ?></h1>
  </div>
