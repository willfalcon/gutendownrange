<?php

  /* Styles and scripts */

  add_action( 'wp_enqueue_scripts', 'cd_theme_styles' );
  add_action( 'wp_enqueue_scripts', 'cd_theme_scripts' );

  function cd_theme_styles() {
    // wp_enqueue_style( 'default_styles', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'boostrap_css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' );
    wp_enqueue_style( 'flickity_css', 'https://unpkg.com/flickity@2/dist/flickity.min.css' );
    wp_enqueue_style( 'lightbox_css', get_template_directory_uri() . '/assets/lightbox/css/lightbox.min.css' );
    wp_enqueue_style( 'typekit_css', 'https://use.typekit.net/cny5mzk.css' );
    wp_enqueue_style( 'main_styles', get_template_directory_uri() . '/build/cdr.min.css' );
    // if ( is_page( 'timesheets' ) ) {
    //   wp_enqueue_style( 'timesheets_css', get_template_directory_uri() . '/react-timesheets/build/timesheets.css' );
    // }
  }

  function cd_theme_scripts() {
    wp_enqueue_script( 'popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js', '', true );
    wp_enqueue_script( 'bootstrap_js', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', array( 'jquery', 'popper' ), '', true );
    wp_enqueue_script( 'flickity_js', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js', array(), '', false );
    wp_enqueue_script( 'lightbox_js', get_template_directory_uri() . '/assets/lightbox/js/lightbox.min.js', array( 'jquery' ), '', true );
    wp_enqueue_script( 'fontawesome', 'https://use.fontawesome.com/965f271379.js' );

    wp_enqueue_script( 'cd_js', get_template_directory_uri() . '/build/cdr.min.js', array( 'jquery', 'flickity_js' ), '', true );
    global $post;
    if ( is_page( 'timesheets' ) || $post->post_parent == '436' ) {
      wp_enqueue_script( 'timesheets_js', get_template_directory_uri() . '/react-timesheets/build/bundle.js', array(), '', true );
    }

  }

  // function switch_page_template() {
  //   global $post;
  //   // Checks if current post type is a page, rather than a post
  // 	if (is_page())
  // 	{
  // 		// Checks if page is parent, if yes, return
  // 		if ($post->post_parent == 0)
  // 			return true;
  // 		else if ($post->post_parent != $post->ID)
  // 		{
  // 			$parent_page_template = get_post_meta($post->post_parent,'_wp_page_template',true);
  //
  // 			$template = TEMPLATEPATH . "/{$parent_page_template}";
  // 			if (file_exists($template)) {
  // 				load_template($template);
  // 				exit;
  // 			}
  // 		}
  // 	}
  // }
  //
  // add_action('template_redirect','switch_page_template');

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

    /* Theme Options Pages */
    if( function_exists('acf_add_options_page') ) {

      $options_setup = array(
        'menu_title' => 'Site Options',
        'menu_slug' => 'cdr-options',
      );
      $main_options = array(
        'menu_title' => 'Main Options',
        'page_title' => 'Camp Down Range Options',
        'parent_slug' => 'cdr-options'
      );
      $contact_info_options = array(
        'menu_title' => 'Contact Info',
        'page_title' => 'Contact Info',
        'parent_slug' => 'cdr-options'
      );


    	acf_add_options_page( $options_setup );
      acf_add_options_sub_page( $main_options );
      acf_add_options_sub_page( $contact_info_options );

    }



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


  	function cd_excerpt_length( $length ) {
  		return 30;
  	}
  	add_filter( 'excerpt_length', 'cd_excerpt_length', 999 );

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
      if ( is_page( 'staff' ) ) {
        $classes .= 'staff-page';
      }
      if ( is_page( 'contact' ) ) {
        $classes .= 'contact-page';
      }
      return $classes;
    }


    $site_options = array(
      'page_title' => 'Site Options'
    );

    // acf_add_options_page( $site_options );

    function acf_load_color_field_choices($field) {

      // reset choices
      $field['choices'] = array();

      // get the textarea value from options page without any formatting
      $repeater_field = get_field('color_palette', 'option', false);

      $choices = array();

      while ( have_rows('color_palette', 'option') ) : the_row();

        $label = get_sub_field('label');
        $color = get_sub_field('color');
        $string = $label . ' : ' . $color;
        $field['choices'][ $color ] = $label;

      endwhile;

      // return the field
      return $field;

    }

    add_filter('acf/load_field/name=regular_content_background_color', 'acf_load_color_field_choices');
    add_filter('acf/load_field/name=background_color', 'acf_load_color_field_choices');

    function cl_img($img, $params = '') {
      // $urlArray = explode('/', $img);
      // $file = $urlArray[7];

      // $ext = substr($img, strpos($img, '.'));

      // if ( $format && $format != $ext ) {
      //   $filename = substr( $file, 0, strpos($file, '.')) . $format;
      //   $urlArray[7] = $filename;
      // }

      $cloudinary_url = 'http://res.cloudinary.com/creative-distillery';

      if ( $params != '' ) {
        $url = $cloudinary_url . '/image/fetch/' . $params. '/' . $img;

      } else {
        $url = $cloudinary_url . '/image/fetch/' . 'f_auto/' . $img;
      }


      // $url = implode('/', $urlArray);
      return $url;
    }

    function cdr_get_img_url($img, $args) {

      if ( is_array($img) ) {
        $img_url = $img['url'];
      } else {
        $img_url = $img;
      }

      if ( function_exists( 'cloudinary_url' ) ) {
        $image_url = cloudinary_url( $img_url, $args );
        return $image_url;
      } else {
        return $img_url;
      }

    }




    add_filter( 'gform_pre_render', 'populate_posts' );
    add_filter( 'gform_pre_validation', 'populate_posts' );
    add_filter( 'gform_pre_submission_filter', 'populate_posts' );
    add_filter( 'gform_admin_pre_render', 'populate_posts' );
    function populate_posts( $form ) {

        foreach ( $form['fields'] as &$field ) {

            if ( $field->type != 'select' || strpos( $field->cssClass, 'age-group' ) === false ) {
                continue;
            }

            $tax_args = array(
              'taxonomy' => 'age_group'
            );
            $tax_terms = get_terms($tax_args);

            $choices = array();

            foreach ( $tax_terms as $term ) {
                $choices[] = array(
                  'text' => $term->name,
                  'value' => $term->term_id
                );
            }

            $field->placeholder = 'Select an Age Group';
            $field->choices = $choices;

        }

        return $form;
    }


    // Disables tabindex attribute on all forms.
    add_filter( 'gform_tabindex', '__return_false' );

    function acf_load_employees( $field ) {

        // reset choices
        $field['choices'] = array();

        //
        // // if has rows
        // if( have_rows('my_select_values', 'option') ) {
        //
        //     // while has rows
        //     while( have_rows('my_select_values', 'option') ) {
        //
        //         // instantiate row
        //         the_row();
        //
        //
        //         // vars
        //         $value = get_sub_field('value');
        //         $label = get_sub_field('label');
        //
        //
        //         // append to choices
        //         $field['choices'][ $value ] = $label;
        //
        //     }
        //
        // }

        $url = 'https://api.airtable.com/v0/appvpsjOd4ayHeMgI/Employees?api_key=keySUYSjrGGJlTGCE';

        //Use file_get_contents to GET the URL in question.
        $contents = file_get_contents($url);

        $contents = json_decode($contents, TRUE);
        //If $contents is not a boolean FALSE value.
        if($contents !== false){
            //Print out the contents.
            foreach ($contents['records'] as $record) {
              if (!empty($record['fields']['first-name']) && !empty($record['fields']['last-name'])) {
                $field['choices'][$record['id']] = $record['fields']['first-name'] . ' ' . $record['fields']['last-name'];
              }
            }

        }


        // return the field
        return $field;

    }

    add_filter('acf/load_field/name=employee', 'acf_load_employees');
