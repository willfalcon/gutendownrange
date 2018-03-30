<div class="donate">

  <h2 class="donate__heading">
    <span class="line"></span>
    <span class="text">Show Your Support</span>
    <span class="line"></span>
  </h2>
  <div class="donate__button-wrapper">
    <a class="donate__button" href="https://paypal.me/campdownrange">

      <svg width="180px" height="60px" viewBox="0 0 180 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
          <desc>Support Button Container</desc>
          <defs></defs>
          <g id="supportButtonOuter" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="supportButtonMiddle" transform="translate(-98.000000, -86.000000)">
                  <g id="supportButtonInner" transform="translate(98.000000, 86.000000)">
                      <path
                        d="M164.859813,59 C172.48345,59 179,46.0875776 179,30 C179,13.9124224 172.48345,1 164.859813,1 L15.1401869,1 C7.51654962,1 1,13.9124224 1,30 C1,46.0875776 7.51654962,59 15.1401869,59 L164.859813,59 Z"
                        id="supportButtonOutsidePath"
                        stroke="#FFFFFF"
                        stroke-width="2">
                      </path>
                      <circle id="supportButtonInsideCircle"
                        stroke="#FFFFFF"
                        stroke-width="2" cx="18" cy="30" r="6">
                      </circle>
                  </g>
              </g>
          </g>
      </svg>

      <span>Donate</span>
    </a>
  </div>

</div>

<?php if ( have_rows( 'sponsors', 'option' ) ) : ?>

  <div class="sponsors">

    <h3 class="sponsors__heading">
      <span class="line"></span>
      <span class="text">Our Sponsors</span>
      <span class="line"></span>
    </h3>

    <ul class="sponsors__list">
      <?php while ( have_rows( 'sponsors', 'option' ) ) : the_row(); ?>
        <li><?php the_sub_field( 'sponsor' ); ?></li>
      <?php endwhile; ?>
    </ul>

  </div>

<?php endif; ?>
