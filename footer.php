
    <footer class="footer">

      <div class="footer__contact-info">

        <div class="footer__address">
          <p><strong><?php bloginfo( 'name' ); ?></strong></p>
          <p>3213 Clinton-Tinnin Road</p>
          <p>Clinton, MS 39056</p>
        </div>

        <div class="footer__social-links">
          <a href="#">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-fb.svg" />
          </a>
          <a href="#">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-tw.svg" />
          </a>
          <a href="#">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-ig.svg" />
          </a>
          <a href="#">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer-yt.svg" />
          </a>
        </div>


        <div class="footer__mailing-address">
          <p><strong>Mailing Address</strong></p>
          <p>PO Box 739</p>
          <p>Clinton, MS 39060</p>
        </div>
      </div>

      <div class="footer__bottom">

        <p>&copy;<?php echo date('Y'); ?>, <?php bloginfo( 'name' ); ?> | <a href="mailto:services@campdownrange.org">Services@CampDownRange.org</a></p>

      </div>


    </footer>

    </div><!--.container-fluid-->


  <?php wp_footer(); ?>
  </body>
</html>
