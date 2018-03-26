
    <footer class="footer">

      <div class="footer__contact-info">

        <div class="footer__address">
          <?php $address = get_field( 'physical_address', 'options' ); ?>
          <p><strong><?php bloginfo( 'name' ); ?></strong></p>
          <p><?php echo $address['address']; ?></p>
          <p><?php echo $address['city_state_zip']; ?></p>
        </div>

        <div class="footer__social-links">
          <?php while ( have_rows( 'social_media', 'options' ) ) : the_row(); ?>
            <?php if ( get_sub_field( 'facebook' ) ) : ?>
              <a href="<?php the_sub_field( 'facebook' ); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-fb.svg" />
              </a>
            <?php endif; ?>
            <?php if ( get_sub_field( 'twitter' ) ) : ?>
              <a href="<?php the_sub_field( 'twitter' ); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-tw.svg" />
              </a>
            <?php endif; ?>
            <?php if ( get_sub_field( 'instagram' ) ) : ?>
              <a href="<?php the_sub_field( 'instagram' ); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-ig.svg" />
              </a>
            <?php endif; ?>
            <?php if ( get_sub_field( 'youtube' ) ) : ?>
              <a href="<?php the_sub_field( 'youtube' ); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-yt.svg" />
              </a>
            <?php endif; ?>
          <?php endwhile; ?>
        </div>


        <div class="footer__mailing-address">
          <?php $mailing_address = get_field( 'mailing_address', 'options' ); ?>
          <p><strong>Mailing Address</strong></p>
          <p><?php echo $mailing_address['address']; ?></p>
          <p><?php echo $mailing_address['city_state_zip']; ?></p>
        </div>
      </div>

      <div class="footer__subscribe-form">

        <?php
          gravity_form( get_field( 'footer_form', 'options' ), true, false, false, null, true );
        ?>

      </div>

      <div class="footer__bottom">

        <p>&copy;<?php echo date('Y'); ?>, <?php bloginfo( 'name' ); ?> | <a href="mailto:<?php the_field( 'main_contact_email', 'options' ); ?>"><?php the_field( 'main_contact_email', 'options' ); ?></a></p>

      </div>


    </footer>

    </div><!--.container-fluid-->


  <?php wp_footer(); ?>
  </body>
</html>
