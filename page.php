<?php get_header(); ?>

<?php
  if ( get_field( 'hero_activated' ) ) {
    get_template_part( 'template-parts/hero' );
  }

  if ( have_rows( 'page_content' ) ) : while ( have_rows( 'page_content' ) ) : the_row();

    get_template_part( 'template-parts/' . get_row_layout() );

  endwhile; endif;


?>

<?php get_footer(); ?>
