<?php
  $cols = get_sub_field( 'columns' );
?>

<section class="regular-content<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?>--texture" style="background-color: <?php the_sub_field( 'regular_content_background_color' ); ?><?php endif; ?>">

  <?php if ( get_sub_field( 'title' ) ) : ?>
    <h2 class="regular-content__title<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?>--color-white<?php endif; ?>">
      <span class="line"></span>
      <span class="text">
        <?php the_sub_field( 'title' ); ?>
      </span>
      <span class="line"></span>
    </h2>
  <?php endif; ?>

  <?php if ( $cols > 1) : ?>
    <div class="regular-content__row<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?>--color-white<?php endif; ?>">

      <div class="regular-content__content--<?php echo $cols; ?>-cols">
        <?php the_sub_field( 'content' ); ?>
      </div>
      <div class="regular-content__content--<?php echo $cols; ?>-cols">
        <?php the_sub_field( 'content_2' ); ?>
      </div>
      <?php if ( $cols > 2 ) : ?>
        <div class="regular-content__content--<?php echo $cols; ?>-cols">
          <?php the_sub_field( 'content_3' ); ?>
        </div>
        <?php if ( $cols == 4 ) : ?>
          <div class="regular-content__content--<?php echo $cols; ?>-cols">
            <?php the_sub_field( 'content_4' ); ?>
          </div>
        <?php endif; ?>
      <?php endif; ?>
    </div>
  <?php else: ?>
    <div class="regular-content__content<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?>--color-white<?php endif; ?>">
      <?php the_sub_field( 'content' ); ?>
    </div>
  <?php endif; ?>
</section>
