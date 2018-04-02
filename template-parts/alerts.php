<?php if ( have_rows( 'alerts', 'options' ) ) : ?>


  <?php while ( have_rows( 'alerts', 'options' ) ) : the_row(); ?>

    <?php
      $now = date('Ymd');
      $start = get_sub_field( 'start', false );


      $end = get_sub_field( 'end', false ) ?: '21000101';
      $link = get_sub_field( 'button' );
    ?>

    <?php if ( $now >= $start && $now <= $end) : ?>

      <div class="alert" style="min-height: 0px; height: 0px; padding: 0px; border: 0px;">

        <p class="alert__message"><?php the_sub_field( 'message' ); ?></p>

        <a class="alert__button" href="<?php echo $link['url']; ?>" target="<?php echo $link['target']; ?>">
          <?php echo $link['title']; ?>
        </a>

        <button class="alert__dismiss">
          <i class="fa fa-times"></i>
        </button>

      </div>

    <?php endif; ?>



  <?php endwhile; ?>


<?php endif; ?>
