<?php get_header(); ?>

<main <?php post_class(); ?>>

  <?php

    if ( have_posts() ) : while ( have_posts() ) : the_post();

      if ( have_rows( 'page_content' ) ) : while ( have_rows( 'page_content' ) ) : the_row();

        get_template_part( 'template-parts/' . get_row_layout() );

      endwhile; endif;

    endwhile; endif;

  ?>

</main>

<?php get_footer(); ?>
