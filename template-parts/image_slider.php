<?php if ( get_sub_field( 'images' ) ) : ?>

  <?php
    $button = get_sub_field( 'button' );
    $images = get_sub_field( 'images' );
    $identifier = get_sub_field( 'identifier' ) ? get_sub_field( 'identifier' ) : get_sub_field( 'title' );
  ?>

  <div class="image-slider" id="sliderWrap-<?php echo $identifier; ?>">

    <?php foreach ( $images as $img ) : ?>

      <div class="image-slider__image">

        <img src="<?php echo $img['sizes']['large']; ?>" />

        <a class="lightbox-link" href="<?php echo $img['url']; ?>" data-lightbox="imgslider-<?php echo $identifier; ?>" data-alt="<?php echo $img['alt']; ?>">
        </a>

      </div>

    <?php endforeach; ?>

    <div class="image-slider__content-wrap slide-right">
      <h2 class="image-slider__title">
        <?php the_sub_field( 'title' ); ?>
      </h2>
      <p class="image-slider__copy">
        <?php the_sub_field( 'text_area' ); ?>
      </p>
      <a href="<?php echo $button['url']; ?>" class="button image-slider__button" target="<?php echo $button['target']; ?>">
        <?php echo $button['title']; ?>
      </a>
    </div>

  </div>

  <script>

    var imgSlider = document.getElementById('sliderWrap-<?php echo $identifier; ?>');
    var flkty2 = new Flickity( imgSlider, {
      // options
      contain: true,
      cellSelector: '.image-slider__image',
      initialIndex: 0,
      imagesLoaded: true,
      wrapAround: true,
      autoPlay: 5000,
      arrowShape: {
        x0: 10,
        x1: 40, y1: 30,
        x2: 42.5, y2: 27.5,
        x3: 15
      }
    });

  </script>

<?php endif; ?>
