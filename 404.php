<?php get_header(); ?>


  <div class="regular-content">


      <h2 class="regular-content__title">
        <span class="line"></span>
        <span class="text">
          <span>4</span>
          <img src="<?php echo get_template_directory_uri(); ?>/assets/img/people-placeholder.png" />
          <span>4</span>
        </span>
        <span class="line"></span>
      </h2>


    <div class="regular-content__content">
      <p><?php the_field('404_text', 'option'); ?></p>

      <?php $link = get_field('404_link', 'option'); ?>

      <a class="button" href="<?php echo $link['url'] ?>" target="<?php echo $link['target']; ?>"><?php echo $link['title']; ?></a>

    </div>

  </div>



<?php get_footer(); ?>
