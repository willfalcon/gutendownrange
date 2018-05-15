<div class="timesheets">

  <?php if ( is_user_logged_in() ) : ?>

    <div class="user" data-user="<?php the_field( 'employee', 'user_' . get_current_user_id() ); ?>">
      <h4 id="userWelcome" style="display: none;"></h4>
    </div>

    <div class="cal-controls" data-week="0">
      <button class="button small" id="prevWeek">< Previous Week</button>
      <button class="button small" id="thisWeek">This Week</button>
      <button class="button small" id="nextWeek">Next Week ></button>
    </div>

    <div class="cal" id="cal" data-week-offset="0"></div>

    <button class="button" id="saveAllFields">Save All</button>

  <?php else: ?>

    <div class="application-form login-form">

      <h1 class="application-form__title">You must be logged in to view this page</h1>
      <?php wp_login_form(); ?>

    </div>

<?php endif; ?>

</div>
