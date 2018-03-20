<?php
  $term = get_sub_field( 'application_for' );
  $form = GFAPI::get_form( get_sub_field('form') );

?>

<div class="application-form" data-app-for="<?php echo $term->term_id; ?>">

  <h1 class="application-form__title"><?php echo $form['title']; ?></h1>
  <?php gravity_form( get_sub_field('form'), false, false, false, null, true); ?>

</div>
