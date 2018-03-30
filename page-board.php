<?php get_header(); ?>

  <div class="people">

    <h1 class="page-title">
      <span class="line"></span>
      <span class="text">Board</span>
      <span class="line"></span>
    </h1>

    <?php

      $board_args = array(
        'post_type' => 'people',
        'tax_query' => array(
      		array(
      			'taxonomy' => 'person_type',
      			'field'    => 'slug',
      			'terms'    => 'board-member'
      		)
      	)
      );

      $board_query = new WP_Query( $board_args);

    ?>

    <div class="staff">

      <?php while ( $board_query->have_posts() ) : $board_query->the_post(); ?>

        <div class="staff-member">

          <?php
            if ( get_field( 'image' ) ) {
              $img = get_field( 'image' );
              $img_url = $img['sizes']['medium'];
              $img_alt = $img['alt'];
            } else {
              $img_url = get_template_directory_uri() . '/assets/img/people-placeholder.png';
              $img_alt = get_the_title();
            }
          ?>

          <img class="staff-member__image" <?php echo get_field( 'image' ) ? 'data-url' : 'src'; ?>="<?php echo $img_url; ?>" data-mask="true" alt="<?php echo $img_alt; ?>" />

          <h3 class="staff-member__name"><?php the_title(); ?></h3>

          <?php if ( get_field( 'position' ) ) : ?>
            <p class="staff-member__position"><strong><?php the_field( 'position' ); ?></strong></p>
          <?php endif; ?>
          <?php if ( get_field( 'companyorganization' ) ) : ?>
            <p class="staff-member__position"><?php the_field( 'companyorganization' ); ?></p>
          <?php endif; ?>


        </div>

      <?php endwhile; ?>

    </div>

    <?php wp_reset_postdata(); ?>

  </div>

  <?php

    if ( have_posts() ) : while ( have_posts() ) : the_post();

      if ( get_field( 'hero_activated' ) ) {
        get_template_part( 'template-parts/hero' );
      }

      if ( have_rows( 'page_content' ) ) : while ( have_rows( 'page_content' ) ) : the_row();

        get_template_part( 'template-parts/' . get_row_layout() );

      endwhile; endif;

    endwhile; endif;

  ?>


<?php get_footer(); ?>
