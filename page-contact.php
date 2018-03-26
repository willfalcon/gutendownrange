<?php get_header(); ?>

  <?php $contact = get_field( 'contact_info', 'option' ); ?>
  <?php $bg_img = get_field( 'background_image' ); ?>

  <div class="contact-bg" style="background-image: url(<?php echo $bg_img['sizes']['large']; ?>);">

    <div class="contact-box">

      <h1 class="page-title color-white">
        <span class="line"></span>
        <span class="text">Contact Us</span>
        <span class="line"></span>
      </h1>

      <div class="contact-form">
        <?php gravity_form( get_field( 'contact_form' ), $display_title = false, $display_description = false, $display_inactive = false, $field_values = null, $ajax = false,'' , $echo = true ); ?>
        <script>
          jQuery(document).ready(function() {
            document.querySelector('.ginput_container_name input').setAttribute('autocomplete', 'name');
            document.querySelector('.ginput_container_email input').setAttribute('autocomplete', 'email');
          });
        </script>
      </div>

      <div class="contact-info">

        <h5>Mailing Address</h5>
        <?php $mailing_address = get_field( 'mailing_address', 'options' ); ?>
        <p><?php echo $mailing_address['address']; ?></p>
        <p><?php echo $mailing_address['city_state_zip']; ?></p>

        <h5 class="mt-4">Physical Address</h5>
        <?php $address = get_field( 'physical_address', 'options' ); ?>
        <p><?php echo $address['address']; ?></p>
        <p><?php echo $address['city_state_zip']; ?></p>


      </div>

    </div>

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
