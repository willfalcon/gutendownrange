<?php get_header(); ?>

<main <?php post_class(); ?>>

  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <h2 class="regular-content__title">
      <span class="line"></span>
      <span class="text">
        <?php the_title(); ?>
      </span>
      <span class="line"></span>
    </h2>

    <?php get_template_part( 'timesheets/timesheets' ); ?>

  <?php endwhile; endif; ?>

</main>

<?php get_footer(); ?>
