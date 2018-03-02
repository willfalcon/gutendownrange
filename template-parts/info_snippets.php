<?php if ( have_rows( 'snippets' ) ) : ?>

<div class="snippets">

  <?php while ( have_rows( 'snippets' ) ) : the_row(); ?>

    <div class="snippet">

      <?php if ( get_sub_field( 'image' ) ) : ?>
        <?php $img = get_sub_field( 'image' ); ?>
        <img class="snippet__image" src="<?php echo $img['sizes']['medium']; ?>" alt="<?php echo $img['alt']; ?>" />
      <?php endif; ?>

      <?php if ( get_sub_field( 'title' ) ) : ?>
        <h2 class="snippet__heading"><?php the_sub_field( 'title' ); ?></h2>
      <?php endif; ?>

      <?php if ( get_sub_field( 'snippet' ) ) : ?>
        <?php the_sub_field( 'snippet' ); ?>
      <?php endif; ?>

      <?php if ( get_sub_field( 'button' ) ) : ?>
        <?php $button = get_sub_field( 'button' ); ?>
        <a href="<?php echo $button['url']; ?>" class="button snippet__button" target="<?php echo $button['target']; ?>">
          <?php echo $button['title']; ?>
        </a>
      <?php endif; ?>

    </div>
  <?php endwhile; ?>

</div>

<?php endif; ?>
