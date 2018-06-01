<?php get_header(); ?>

<main <?php post_class('timesheets'); ?>>

  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <h2 class="regular-content__title">
      <span class="line"></span>
      <span class="text">
        Weekly Timesheets
      </span>
      <span class="line"></span>
    </h2>

    <?php get_template_part( 'react-timesheets/timesheets' ); ?>

  <?php endwhile; endif; ?>

</main>

<?php get_footer(); ?>
