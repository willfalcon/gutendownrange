<?php get_header(); ?>

  <div class="top">
    <div class="top__content slide-down on-load">
      <p class="font-main">Camp Down Range creates challenging experiences to push participants past their comfort  zones and gain a lifelong benefit  of team bonding, personal development, and the ability  of triumph over adversity.</p>
    </div>
  </div>

  <div class="snippets">
    <div class="snippet">
      <img class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/img/cj.png" alt="CJ Stewart" />
      <h2 class="snippet__heading">CJ Stewart</h2>
      <p>Camp Down Range is the vocational calling of CJ Stewart, an Army veteran of the conflict in Afghanistan and a Purple Heart recipient.</p>
      <a href="#" class="button snippet__button">Learn More</a>
    </div>
    <div class="snippet">
      <img class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/img/facilities.png" alt="Facilities" />
      <h2 class="snippet__heading">Facilities</h2>
      <p>Camp Down Range is a beautiful lakefront property filled with trails, obstacles, a ropes course, and a  200-seat dining hall that can host anything from an intense adventure race to a couples counseling retreat.</p>
      <a href="#" class="button snippet__button">Learn More</a>
    </div>
    <div class="snippet">
      <img class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/img/support.png" alt="Support" />
      <h2 class="snippet__heading">Support</h2>
      <p>Our mission is to bring our experiences to those who need  it most. We can’t complete that mission without support from individual and corporate donors.</p>
      <a href="#" class="button snippet__button">Learn More</a>
    </div>
  </div>

  <?php get_template_part( 'template-parts/donate' ); ?>

<?php get_footer(); ?>
