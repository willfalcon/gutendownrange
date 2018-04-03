<div class="article-wrap manhood">
  <article <?php post_class('article'); ?>>

    <h2 class="article__title">
      Manhood 101 Tips
    </h2>

    <?php $img = get_field( 'manhood_photo' ); ?>

    <div class="article__image">
      <img src="<?php echo $img['sizes']['thumbnail']; ?>" alt="Manhood 101 Tip" />
    </div>



    <div class="article__excerpt"><?php the_excerpt(); ?></div>

    <a class="article__link" href="<?php the_permalink(); ?>">Read More</a>

  </article>
</div>
