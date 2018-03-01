<?php
  $animation = get_sub_field( 'animation' );
?>
<div class="callout-text<?php if ( $animation && $animation != 'none' ) { echo ' ' . $animation; }; ?>">

  <p class="callout-text__content"><?php the_sub_field( 'text' ); ?></p>

</div>
