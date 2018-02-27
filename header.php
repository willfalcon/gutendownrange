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

    <nav class="navbar navbar-expand-md cd-navbar">

      <a class="navbar-brand" href="<?php bloginfo('url'); ?>">
        <img class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/img/CDR-logo-02.svg" alt="Camp Down Range"/>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle Main Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="collapse navbar-collapse cd-nav justify-content-end text-center" id="main_nav">

        <?php
          $main_menu = array(
            'theme_location' => 'main_menu',
            'menu_class' => 'navbar-nav nav cd-menu',
            'container' => false
          );

          wp_nav_menu( $main_menu );
        ?>

      </div>
    </nav>

  <div class="container-fluid">
