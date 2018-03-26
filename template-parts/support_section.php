<!-- support_section.php template router -->

<?php

  $variation = get_sub_field( 'variation' );

  if ( $variation == 'sponsors_on_top' ) {

    get_template_part( 'template-parts/support', 'sponsors' );
    echo '<!-- triggered support-sponsors.php -->';

  } else {

    get_template_part( 'template-parts/support', 'donate' );
    echo '<!-- triggered support-donate.php -->';
    
  }

?>
