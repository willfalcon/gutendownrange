<div class="article-wrap">
  <article <?php post_class('article'); ?>>

    <?php $img = get_field('img'); ?>
    <div class="article__image">
      <img src="<?php echo $img['sizes']['medium']; ?>" alt="<?php echo $img['alt']; ?>" />
    </div>

    <h2 class="article__title">
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    </h2>

    <div class="article__excerpt"><?php the_excerpt(); ?></div>

    <a class="article__link" href="<?php the_permalink(); ?>">Read More</a>

  </article>
</div>
