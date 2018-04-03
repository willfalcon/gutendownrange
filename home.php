<?php get_header(); ?>

<div class="news-page">

  <?php if ( have_posts() ) : ?>

    <h1 class="page-title">
      <span class="line"></span>
      <span class="text">News</span>
      <span class="line"></span>
    </h1>

    <main class="news-feed">

      <?php

        while ( have_posts() ) : the_post();

          $category = get_the_category();

          get_template_part( 'template-parts/post', $category[0]->slug );

        endwhile;

      ?>

      <div class="pagination">

        <?php
          global $wp_query;

          $big = 999999999; // need an unlikely integer

          $args = array(
            'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
          	'format' => '?paged=%#%',
          	'current' => max( 1, get_query_var('paged') ),
          	'total' => $wp_query->max_num_pages,
            'prev_text'          => __('<i class="fa fa-angle-left fa-lg"></i>'),
          	'next_text'          => __('<i class="fa fa-angle-right fa-lg"></i>'),
          );
          echo paginate_links( $args );
        ?>

      </div>

    </main>

    <aside class="news-sidebar">

      <div class="categories">

        <h3 class="categories__heading">Categories</h3>

        <?php
          $cat_args = array(
            'hide_empty' => false,
          );
          $categories = get_categories( $cat_args );
          // print_r($categories);
        ?>

        <ul class="categories__list">

          <?php foreach ( $categories as $category ) : ?>
            <li class="category">
              <a href="<?php echo get_term_link( $category->term_id ); ?>">
                <?php echo $category->name; ?>
              </a>
            </li>
          <?php endforeach; ?>

        </ul>

      </div>

    </aside>


  <?php endif; ?>

</div>

<?php

  if ( have_rows( 'page_content' ) ) : while ( have_rows( 'page_content' ) ) : the_row();

    get_template_part( 'template-parts/' . get_row_layout() );

  endwhile; endif;

?>

<?php get_footer(); ?>
