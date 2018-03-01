<?php

  /* Styles and scripts */

  add_action( 'wp_enqueue_scripts', 'cd_theme_styles' );
  add_action( 'wp_enqueue_scripts', 'cd_theme_scripts' );

  function cd_theme_styles() {
    wp_enqueue_style( 'default_styles', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'boostrap_css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' );
    wp_enqueue_style( 'flickity_css', 'https://unpkg.com/flickity@2/dist/flickity.min.css' );
    wp_enqueue_style( 'lightbox_css', get_template_directory_uri() . '/assets/lightbox/css/lightbox.min.css' );
    wp_enqueue_style( 'typekit_css', 'https://use.typekit.net/cny5mzk.css' );
    wp_enqueue_style( 'main_styles', get_template_directory_uri() . '/assets/css/cdr.css' );
  }

  function cd_theme_scripts() {
    wp_enqueue_script( 'popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js', '', '', true );
    wp_enqueue_script( 'bootstrap_js', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', array( 'jquery', 'popper' ), '', true );
    wp_enqueue_script( 'flickity_js', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js', array(), '', '', true );
    wp_enqueue_script( 'lightbox_js', get_template_directory_uri() . '/assets/lightbox/js/lightbox.min.js', array( 'jquery' ), '', '', true );
    // wp_enqueue_script( 'fontawesome', 'https://use.fontawesome.com/83e45d9121.js' );
    wp_enqueue_script( 'cd_js', get_template_directory_uri() . '/assets/js/cdr.js', array( 'jquery', 'flickity_js' ), '', true );
  }

  /* Add Theme Supports */
    add_theme_support( 'menus' );
    add_theme_support( 'title-tag' );

  /* Create Menu Locations */
    function register_theme_menus() {
      register_nav_menus(
        array(
          'main_menu' => 'Main Menu',
        )
      );
    }
    add_action( 'init', 'register_theme_menus' );

    /* Add .nav-item to li elements in navbar */

    function cd_excerpt_more( $more ) {
      /**
       * Filters the excerpt "read more" string.
       *
       * @param string $more "Read more" excerpt string.
       * @return string (Maybe) modified "read more" excerpt string.
       */
        return '...';
    }

    add_filter( 'excerpt_more', 'cd_excerpt_more' );


    // $site_options = array(
    //   'page_title' => 'Site Options'
    // );
    //
    // acf_add_options_page( $site_options );
    //

    function cdr_body_classes() {
      $classes = '';
      if ( is_front_page() ) {
        $classes .= 'front-page';
      }
      return $classes;
    }

      
    $site_options = array(
      'page_title' => 'Site Options'
    );

    acf_add_options_page( $site_options );
