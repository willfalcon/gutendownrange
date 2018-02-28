<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">

    <?php wp_head(); ?>

  </head>

  <body <?php body_class(); ?>>

    <nav class="cdr-navbar">

      <a class="cdr-brand" href="<?php bloginfo('url'); ?>">
        <img id="logoDark" class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/img/CDR-logo-02.png" alt="Camp Down Range"/>
        <img id="logoLight" style="opacity: 0;" class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/img/CDR-logo-light.png" alt="Camp Down Range"/>
      </a>

      <button id="navbarToggler" class="navbar-toggler" type="button" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle Main Menu">

        <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
            <desc>Created with Sketch.</desc>
            <defs>
                <polygon id="path-1" points="0.6061 0 19 0 19 18.3939 0.6061 18.3939"></polygon>
                <polygon id="path-3" points="0 0.0004 18.3947 0.0004 18.3947 18.3944 0 18.3944"></polygon>
                <polygon id="path-5" points="0.6056 0.6063 19 0.6063 19 19 0.6056 19"></polygon>
                <polygon id="path-7" points="0.0002 0.6058 18.3942 0.6058 18.3942 19 0.0002 19"></polygon>
            </defs>

            <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">

              <g id="Group-3" transform="translate(21.000000, 0.000000)">
                <path d="M16.5851,18.3939 L19.0001,18.3939 C18.2231,8.5919 10.4081,0.7769 0.6061,-0.0001 L0.6061,2.4149 C9.0641,3.1809 15.8181,9.9349 16.5851,18.3939" id="toggleTR" fill="#478E41" mask="url(#mask-2)"></path>
              </g>
              <g id="Group-6">
                <path d="M18.3947,2.4154 L18.3947,0.0004 C8.5917,0.7764 0.7767,8.5924 -0.0003,18.3944 L2.4157,18.3944 C3.1817,9.9354 9.9357,3.1814 18.3947,2.4154" id="toggleTL" fill="#478E41" mask="url(#mask-4)"></path>
              </g>
              <g id="Group-9" transform="translate(21.000000, 21.000000)">
                <path d="M0.6056,16.5853 L0.6056,19.0003 C10.4086,18.2233 18.2226,10.4073 19.0006,0.6063 L16.5846,0.6063 C15.8186,9.0643 9.0646,15.8183 0.6056,16.5853" id="toggleBR" fill="#478E41" mask="url(#mask-6)"></path>
              </g>
              <g id="Group-12" transform="translate(0.000000, 21.000000)">
                <path d="M2.4152,0.6058 L0.0002,0.6058 C0.7762,10.4078 8.5922,18.2228 18.3942,19.0008 L18.3942,16.5848 C9.9362,15.8188 3.1812,9.0648 2.4152,0.6058" id="toggleBL" fill="#478E41" mask="url(#mask-8)"></path>
              </g>

            </g>
        </svg>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="cdr-nav" id="main_nav">

        <?php
          $main_menu = array(
            'theme_location' => 'main_menu',
            'menu_class' => 'cdr-menu',
            'container' => false
          );

          wp_nav_menu( $main_menu );
        ?>

        <div class="support-wrapper">

          <?php
            $support_color = wp_is_mobile() ? '#FFFFFF' : '#478E41';
          ?>
          <a class="support-button" href="#">

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
                              stroke="<?php echo $support_color; ?>"
                              stroke-width="2">
                            </path>
                            <circle id="supportButtonInsideCircle"
                              stroke="<?php echo $support_color; ?>"
                              stroke-width="2" cx="18" cy="30" r="6">
                            </circle>
                        </g>
                    </g>
                </g>
            </svg>

            <span>Support</span>
          </a>
        </div>
      </div>
    </nav>

  <div class="container-fluid">
