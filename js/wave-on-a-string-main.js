// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var WOASScreen = require( 'WAVE_ON_A_STRING/wave-on-a-string/view/WOASScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var waveOnAStringTitleString = require( 'string!WAVE_ON_A_STRING/wave-on-a-string.title' );

  // constants
  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson, Ariel Paul',
      softwareDevelopment: 'Jonathan Olson, Michael Dubson',
      team: 'Trish Loeblein, Ariel Paul, Kathy Perkins, Amy Rouinfar',
      graphicArts: 'Sharon Siman-Tov',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\n' +
              'to convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( waveOnAStringTitleString, [
      new WOASScreen( tandem.createTandem( 'waveOnAStringScreen' ) )
    ], simOptions ).start();
  } );
} );
