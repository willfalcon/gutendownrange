<!-- support_section.php template router -->

<?php

  $variation = get_sub_field( 'variation' );

  if ( $variation == 'donate_on_top' ) {

    get_template_part( 'template-parts/support', 'donate' );
    echo '<!-- triggered support-donate.php -->';

  } elseif ( $variation == 'sponsors_on_top' ) {

    get_template_part( 'template-parts/support', 'sponsors' );
    echo '<!-- triggered support-sponsors.php -->';

  } elseif ( $variation == 'extended' ) {

    get_template_part( 'support', 'extended' );

  }

?>
