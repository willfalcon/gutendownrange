<?php get_header(); ?>


  <?php $contact = get_field( 'contact_info', 'option' ); ?>

  <div class="contact-bg">

    <div class="contact-box">

      <h1 class="page-title color-white">
        <span class="line"></span>
        <span class="text">Contact Us</span>
        <span class="line"></span>
      </h1>

      <div class="contact-form">
        <?php gravity_form( 2, $display_title = false, $display_description = false, $display_inactive = false, $field_values = null, $ajax = false,'' , $echo = true ); ?>
        <script>
          jQuery(document).ready(function() {
            document.querySelector('.ginput_container_name input').setAttribute('autocomplete', 'name');
            document.querySelector('.ginput_container_email input').setAttribute('autocomplete', 'email');


          });

        </script>
      </div>

      <div class="contact-info">

        <h5>Mailing Address</h5>
        <?php if ( $contact['mailing_address']['address'] ) : ?>
          <p><?php echo $contact['mailing_address']['address']; ?></p>
        <?php endif; ?>
        <?php if ( $contact['mailing_address']['address_2'] ) : ?>
          <p><?php echo $contact['mailing_address']['address_2']; ?></p>
        <?php endif; ?>
        <?php if ( $contact['mailing_address']['city'] || $contact['mailing_address']['state'] || $contact['mailing_address']['zip'] ) : ?>
          <p>
            <?php if ( $contact['mailing_address']['city'] ) : ?>
              <?php echo $contact['mailing_address']['city']; ?>,
            <?php endif; ?>
            <?php if ( $contact['mailing_address']['state'] ) : ?>
              <?php echo $contact['mailing_address']['state']; ?>
            <?php endif; ?>
            <?php if ( $contact['mailing_address']['zip'] ) : ?>
              <?php echo $contact['mailing_address']['zip']; ?>
            <?php endif; ?>
          </p>
        <?php endif; ?>

        <h5 class="mt-4">Physical Address</h5>
        <?php if ( $contact['physical_address']['address'] ) : ?>
          <p><?php echo $contact['physical_address']['address']; ?></p>
        <?php endif; ?>
        <?php if ( $contact['physical_address']['address_2'] ) : ?>
          <p><?php echo $contact['physical_address']['address_2']; ?></p>
        <?php endif; ?>
        <?php if ( $contact['physical_address']['city'] || $contact['physical_address']['state'] || $contact['physical_address']['zip'] ) : ?>
          <p>
            <?php if ( $contact['physical_address']['city'] ) : ?>
              <?php echo $contact['physical_address']['city']; ?>,
            <?php endif; ?>
            <?php if ( $contact['physical_address']['state'] ) : ?>
              <?php echo $contact['physical_address']['state']; ?>
            <?php endif; ?>
            <?php if ( $contact['physical_address']['zip'] ) : ?>
              <?php echo $contact['physical_address']['zip']; ?>
            <?php endif; ?>
          </p>
        <?php endif; ?>


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
