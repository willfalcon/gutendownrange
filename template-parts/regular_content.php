

<div class="regular-content"<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?> style="background-color: <?php the_sub_field( 'regular_content_background_color' ); ?>"<?php endif; ?>>

  <h2 class="regular-content__title<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?>--color-white<?php endif; ?>">
    <span class="line"></span>
    <span class="text">
      <?php the_sub_field( 'title' ); ?>
    </span>
    <span class="line"></span>
  </h2>

  <div class="regular-content__content<?php if ( get_sub_field( 'regular_content_background_color' ) ) : ?>--color-white<?php endif; ?>">
    <?php the_sub_field( 'content' ); ?>
  </div>

</div>
