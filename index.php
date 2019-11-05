<?php
/**
 * Plugin Name: Custom Gutenberg Block
 * Plugin URI:
 * Description: This is a custom block for Gutenberg editor by ARCHETYP Inc.
 * Version: 1.0.0
 * Author: ARCHETYP Inc.
 *
 * @package custom-gutenberg-block
 */

defined( 'ABSPATH' ) || exit;

define('VIRSION', '1.0.0');

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function custom_gutenberg_register_block() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script(
    'custom-gutenberg-block',
    plugins_url( 'build/block.js', __FILE__ ),
    array( 'wp-blocks', 'wp-editor', 'wp-element' ),
    VIRSION
  );

    wp_register_script(
    'custom-gutenberg-hidden',
    plugins_url( 'build/mobile-hidden.js', __FILE__ ),
    array( 'wp-blocks', 'wp-editor', 'wp-element' ),
    VIRSION
  );

  register_block_type( 'custom-gutenberg-block/custom-gutenberg-block', array(
    'editor_script' => 'custom-gutenberg-block',
  ) );
}
add_action( 'init', 'custom_gutenberg_register_block' );