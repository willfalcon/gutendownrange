<?php get_header(); ?>

  <div class="people">

    <h1 class="page-title">
      <span class="line"></span>
      <span class="text">Staff</span>
      <span class="line"></span>
    </h1>

    <?php

      $staff_args = array(
        'post_type' => 'people',
        'tax_query' => array(
      		array(
      			'taxonomy' => 'person_type',
      			'field'    => 'slug',
      			'terms'    => 'staff'
      		)
      	)
      );

      $staff_query = new WP_Query( $staff_args);

    ?>

    <?php if ( $staff_query->have_posts() ) : ?>

      <div class="staff">

        <?php while ( $staff_query->have_posts() ) : $staff_query->the_post(); ?>

          <?php if ( get_field( 'bio' ) ) : ?>
            <a class="staff-member" data-toggle="modal" data-target="#staff-modal-<?php echo $post->ID; ?>">
          <?php else: ?>
            <div class="staff-member">
          <?php endif; ?>

            <?php
              if ( get_field( 'image' ) ) {
                $img = get_field( 'image' );
                $img_url = $img['sizes']['medium'];
                $img_url_modal = $img['sizes']['medium_large'];
                $img_alt = $img['alt'];
              } else {
                $img_url = get_template_directory_uri() . 'assets/img/people-placeholder.png';
                $img_alt = get_the_title();
              }
            ?>

            <img class="img-fluid" src="<?php echo $img_url; ?>" alt="<?php echo $img_alt; ?>" />

            <h3 class="staff-member__name"><?php the_title(); ?></h3>

            <?php if ( get_field( 'position' ) ) : ?>
              <p class="staff-member__position"><?php the_field( 'position' ); ?></p>
            <?php endif; ?>

          <?php if ( get_field( 'bio' ) ) : ?>
            </a>
          <?php else: ?>
            </div>
          <?php endif; ?>
          
          <?php if ( get_field( 'bio' ) ) : ?>

            <div class="modal fade" id="staff-modal-<?php echo $post->ID; ?>" tabindex="-1" role="dialog">

              <div class="modal-dialog staff-modal"  role="document">
                <div class="modal-content">

                  <div class="staff-modal__detail">

                    <img class="img-fluid" src="<?php echo $img_url_modal; ?>" alt="<?php echo $img_alt; ?>" />

                    <h3 class="staff-member__name"><?php the_title(); ?></h3>

                    <?php if ( get_field( 'position' ) ) : ?>
                      <p class="staff-member__position"><?php the_field( 'position' ); ?></p>
                    <?php endif; ?>

                  </div>

                  <div class="staff-modal__bio">

                    <?php the_field( 'bio' );?>

                  </div>

                  <button type="button" class="staff-modal__close" data-dismiss="modal">
                    <span></span>
                    <span></span>
                  </button>

                </div>
              </div>

            </div>
          <?php endif; ?>


        <?php endwhile; ?>

      </div>

    <?php endif; wp_reset_postdata(); ?>

    <?php

      $volunteer_args = array(
        'post_type' => 'people',
        'tax_query' => array(
      		array(
      			'taxonomy' => 'person_type',
      			'field'    => 'slug',
      			'terms'    => 'volunteer'
      		)
      	)
      );

      $volunteer_query = new WP_Query( $volunteer_args);

      $other_args = array(
        'post_type' => 'people',
        'tax_query' => array(
      		array(
      			'taxonomy' => 'person_type',
      			'field'    => 'slug',
      			'terms'    => 'other'
      		)
      	)
      );

      $other_query = new WP_Query( $other_args);

    ?>


    <div class="staff">

      <?php while ( $volunteer_query->have_posts() ) : $volunteer_query->the_post(); ?>

        <div class="staff-member--volunteer">

          <?php
            if ( get_field( 'image' ) ) {
              $img = get_field( 'image' );
              $img_url = $img['sizes']['medium'];
              $img_alt = $img['alt'];
            } else {
              $img_url = get_template_directory_uri() . 'assets/img/people-placeholder.png';
              $img_alt = get_the_title();
            }
          ?>

          <img class="img-fluid" src="<?php echo $img_url; ?>" alt="<?php echo $img_alt; ?>" />

          <h3 class="staff-member__name"><?php the_title(); ?></h3>

          <p class="staff-member__position">Volunteer</p>

        </div>

      <?php endwhile; ?>
      <?php while ( $other_query->have_posts() ) : $other_query->the_post(); ?>

        <div class="staff-member--volunteer">

          <?php
            if ( get_field( 'image' ) ) {
              $img = get_field( 'image' );
              $img_url = $img['sizes']['medium'];
              $img_alt = $img['alt'];
            } else {
              $img_url = get_template_directory_uri() . 'assets/img/people-placeholder.png';
              $img_alt = get_the_title();
            }
          ?>

          <img class="img-fluid" src="<?php echo $img_url; ?>" alt="<?php echo $img_alt; ?>" />

          <h3 class="staff-member__name"><?php the_title(); ?></h3>

        </div>

      <?php endwhile; ?>

    </div>

    <?php wp_reset_postdata(); ?>

  </div>

<?php get_footer(); ?>
