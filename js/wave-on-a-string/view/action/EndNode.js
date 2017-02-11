// Copyright 2013-2015, University of Colorado Boulder

/**
 * end object view
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var waveOnAString = require( 'WAVE_ON_A_STRING/waveOnAString' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Constants = require( 'WAVE_ON_A_STRING/wave-on-a-string/Constants' );

  // images
  var ringBackImage = require( 'image!WAVE_ON_A_STRING/ring_back.png' );
  var ringFrontImage = require( 'image!WAVE_ON_A_STRING/ring_front.png' );
  var windowImage = require( 'image!WAVE_ON_A_STRING/window-back.png' );
  var harmonicaImage = require( 'image!WAVE_ON_A_STRING/harmonica.png' );
  var slidewhistleImage = require( 'image!WAVE_ON_A_STRING/slidewhistle.png' );
  var talkingImage = require( 'image!WAVE_ON_A_STRING/talking.png' );
  var silenceImage = require( 'image!WAVE_ON_A_STRING/silence.png' );
  var triangleImage = require( 'image!WAVE_ON_A_STRING/triangle.png' );
  var clampImage = require( 'image!WAVE_ON_A_STRING/clamp.png' );

  function EndNode( model, frame, options ) {
    Node.call( this );
    var clamp = new Image( clampImage, { x: -17, y: -31, scale: 0.4 } );
    var ring_back = new Node( { children: [ new Image( ringBackImage, { x: 5, y: -14 / 2, scale: 0.5 } ) ] } );
    var ring_front = new Node( { children: [ new Image( ringFrontImage, { x: 4.7, y: 0, scale: 0.5 } ) ] } );
    console.log( Constants.windowScale );

    var windowNode = new Image( windowImage, { right: Constants.windowXOffset + Constants.windowShift, centerY: 0, scale: Constants.windowScale } );
    var harmonicaNode = new Image( harmonicaImage, { right: Constants.windowXOffset + Constants.windowShift, centerY: 0, scale: .15 } );
    var slidewhistleNode = new Image( slidewhistleImage, { right: Constants.windowXOffset + Constants.windowShift, centerY: 0, scale: .4 } );
    var talkingNode = new Image( talkingImage, { right: Constants.windowXOffset + Constants.windowShift, centerY: 0, scale: .1 } );
    var silenceNode = new Image( silenceImage, { right: Constants.windowXOffset + Constants.windowShift, centerY: 0, scale: .4 } );
    var triangleNode = new Image( triangleImage, { right: Constants.windowXOffset + Constants.windowShift, centerY: 0, scale: .3 } );
    var post = new Rectangle( -5, -130, 10, 260, {
      stroke: '#000',
      fill: Constants.postGradient,
      x: 20
    } );

    this.addChild( clamp );
    this.addChild( ring_back );
    this.addChild( post );
    this.addChild( ring_front );
    this.addChild( harmonicaNode );
    this.addChild( slidewhistleNode );
    this.addChild( talkingNode );
    this.addChild( silenceNode );
    this.addChild( triangleNode );
    this.windowNode = windowNode;

    this.mutate( options );

    function updateRing() {
      ring_front.y = ring_back.y = model.yNow[ model.yNow.length - 1 ] || 0;
    }

    var dirty = true;
    model.yNowChanged.addListener( function() { dirty = true; } );
    frame.addListener( function() {
      if ( dirty ) {
        updateRing();
        dirty = false;
      }
    } );


    clamp.setVisible( false );
    ring_back.setVisible( false );
    post.setVisible( false );
    ring_front.setVisible( false );
    windowNode.setVisible( false );
    harmonicaNode.setVisible( false );
    slidewhistleNode.setVisible( false );
    talkingNode.setVisible( false );
    silenceNode.setVisible( true );
    triangleNode.setVisible( false );

    var imageNodes = [
      silenceNode,
      harmonicaNode,
      slidewhistleNode,
      triangleNode,
      talkingNode
    ];

    var ws = new WebSocket( 'ws://127.0.0.1:12100' );
    ws.onopen = function() {
      console.log('ws connected');
      ws.addEventListener( 'message', function( event ) {
        var newOSCMessage = JSON.parse( event.data );
        // console.log( event.data );
        // console.log(imageNodes.length );
        for ( var i = 0;  i < imageNodes.length; i++ ) {
          // console.log( 'i: ', i, ' newarg: ', newOSCMessage.args[2] - 1 );
          imageNodes[i].setVisible( newOSCMessage.args[2] - 1 === i );
        }
      } );
    };

  }

  waveOnAString.register( 'EndNode', EndNode );

  inherit( Node, EndNode );

  return EndNode;
} );
