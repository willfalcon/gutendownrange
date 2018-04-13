  <?php
    $hero_img = get_sub_field( 'image' );
  ?>
  <div class="hero">
    <img class="hero-image" src="<?php echo $hero_img['sizes']['large']; ?>" alt="<?php $hero_img['alt']; ?>" />
    <img class="hero-bottom" src="<?php echo get_template_directory_uri(); ?>/assets/img/hero-bottom.svg"/>

    <h1 class="hero__heading"><?php echo get_sub_field( 'heading' ) ? get_sub_field( 'heading' ) : get_the_title(); ?></h1>
  </div>
