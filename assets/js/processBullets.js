module.exports = () => {
  var lastElement = false;
  jQuery("br").remove(".tempbreak");
  jQuery(".sponsors__list li").each(function() {
      jQuery(this).removeClass("nobullet");
      if (lastElement && lastElement.offset().top != jQuery(this).offset().top) {
          jQuery(lastElement).addClass("nobullet");
          jQuery(lastElement).append('<br class="tempbreak" />');
      }
      lastElement = jQuery(this);
  }).last().addClass("nobullet");
}
