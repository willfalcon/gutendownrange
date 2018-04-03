<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

  <?php if ( get_field( 'img' ) ) : ?>

    <?php $hero_img = get_field( 'img' ); ?>

    <div class="hero">
      <img class="hero-image" src="<?php echo $hero_img['sizes']['large']; ?>" alt="<?php $hero_img['alt']; ?>" />
      <img class="hero-bottom" src="<?php echo get_template_directory_uri(); ?>/assets/img/hero-bottom.svg"/>
    </div>
  <?php endif; ?>

  <div class="regular-content">

    <?php if ( get_the_title() ) : ?>
      <h2 class="regular-content__title">
        <span class="line"></span>
        <span class="text">
          <?php the_title(); ?>
        </span>
        <span class="line"></span>
      </h2>
    <?php endif; ?>

    <div class="regular-content__content">
      <?php the_content(); ?>
    </div>

  </div>

<?php endwhile; endif; ?>

<?php

  if ( have_rows( 'page_content' ) ) : while ( have_rows( 'page_content' ) ) : the_row();

    get_template_part( 'template-parts/' . get_row_layout() );

  endwhile; endif;

?>

<?php get_footer(); ?>
