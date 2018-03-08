
<?php if ( have_rows( 'slides' ) ) : ?>

  <?php $identifier = get_sub_field( 'identifier' ); ?>


  <div class="slider" id="sliderWrap-<?php echo $identifier; ?>">

    <?php while ( have_rows( 'slides' ) ) : the_row(); ?>

      <?php
        $img = get_sub_field( 'image' );
        $button = get_sub_field( 'button' );
      ?>

      <div class="slide<?php if ( get_row_index() == 1 ) : ?> slide-right<?php endif; ?>">
        <img src="<?php echo $img['sizes']['large']; ?>" />
        <a class="lightbox-link" href="<?php echo $img['url']; ?>" data-lightbox="slide-img-<?php the_row_index(); ?>" data-alt="<?php echo $img['alt']; ?>">
        </a>
        <h2 class="slide__title">
          <?php the_sub_field( 'title' ); ?>
        </h2>
        <div class="slide__copy">
          <?php the_sub_field( 'text_area' ); ?>
        </div>
        <a href="<?php echo $button['url']; ?>" class="button slide__button" target="<?php echo $button['target']; ?>">
          <?php echo $button['title']; ?>
        </a>
      </div>

    <?php endwhile; ?>

  </div>

  <script>

    var slider = document.getElementById('sliderWrap-<?php echo $identifier; ?>');
    var flkty = new Flickity( slider, {
      // options
      contain: true,
      cellSelector: '.slide',
      initialIndex: 0,
      imagesLoaded: true,
      autoPlay: 8000,
      arrowShape: {
        x0: 10,
        x1: 40, y1: 30,
        x2: 42.5, y2: 27.5,
        x3: 15
      }
    });

  </script>

<?php endif; ?>
