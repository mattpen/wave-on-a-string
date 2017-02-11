// Copyright 2013-2015, University of Colorado Boulder

/**
 * the Strings node view
 *
 * Author: Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var waveOnAString = require( 'WAVE_ON_A_STRING/waveOnAString' );
  var Shape = require( 'KITE/Shape' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Circle = require( 'SCENERY/nodes/Circle' );

  function TheStringNode( model, frame, options ) {
    var self = this;
    Node.call( this, { layerSplit: true } );
    var theStringShape = new Shape();
    var theStringPath = new Path( theStringShape, {
      stroke: '#F00'
    } );
    var theString = [];
    var redString = [];
    var blueString = [];

    this.addChild( theStringPath );

    theStringPath.computeShapeBounds = function() {
      return this.getShape().bounds.dilated( 20 ); // miterLimit should cut off with the normal stroke before this
    };

    var highlightCircle = new Circle( options.radius * 0.3, { fill: '#fff', x: -0.45 * options.radius, y: -0.45 * options.radius } );
    var scale = 3;
    var redBead = new Circle( options.radius, { fill: 'red', stroke: 'black', lineWidth: 0.5, children: [ highlightCircle ], scale: scale } );
    var blueBead = new Circle( options.radius, { fill: 'blue', stroke: 'black', lineWidth: 0.5, children: [ highlightCircle ], scale: scale } );
    var limeBead = new Circle( options.radius, { fill: 'lime', stroke: 'black', lineWidth: 0.5, children: [ highlightCircle ], scale: scale } );

    var redNode;
    redBead.toDataURL( function( url, x, y ) {
      redNode = new Image( url, { x: -x / scale, y: -y / scale, scale: 1 / scale } );
    } );

    var blueNode;
    blueBead.toDataURL( function( url, x, y ) {
      blueNode = new Image( url, { x: -x / scale, y: -y / scale, scale: 1 / scale } );
    } );

    var limeNode;
    limeBead.toDataURL( function( url, x, y ) {
      limeNode = new Image( url, { x: -x / scale, y: -y / scale, scale: 1 / scale } );
    } );

    for ( var i = 0; i < model.yDraw.length; i++ ) {
      var redStringBead = ( i % 10 === 0 ) ? limeNode : redNode;
      redString.push( new Node( { x: i * options.radius * 2, children: [ redStringBead ] } ) );
    }
    redString[ 0 ].scale( 1.2 );

    for ( var j = 0; j < model.yDraw.length; j++ ) {
      var blueStringBead = ( j % 10 === 0 ) ? limeNode : blueNode;
      blueString.push( new Node( { x: j * options.radius * 2, children: [ blueStringBead  ] } ) );
    }
    blueString[ 0 ].scale( 1.2 );

    theString = blueString;

    var blueStringNode = new Node( { children: blueString } );
    var redStringNode = new Node( { children: redString } );

    this.addChild( blueStringNode );

    this.mutate( options );

    function updateTheString() {
      theStringShape = new Shape();
      theString[ 0 ].y = model.nextLeftY;
      theStringShape.lineTo( 0, model.nextLeftY || 0 );
      for ( var i = 1; i < model.yDraw.length; i++ ) {
        theString[ i ].y = model.yDraw[ i ];
        /*REVIEW:
         * A lot of the performance issues relate to this shape drawing. There's nothing you can do here,
         * I'll hopefully have speed improvements to Kite's Shape soon to make this much faster. Sorry!
         */
        theStringShape.lineTo( i * options.radius * 2, model.yDraw[ i ] || 0 );
      }
      theStringPath.shape = theStringShape;
    }

    var dirty = true;
    model.yNowChanged.addListener( function() { dirty = true; } );
    frame.addListener( function() {
      if ( dirty ) {
        updateTheString();
        dirty = false;
      }
    } );
  }

  waveOnAString.register( 'TheStringNode', TheStringNode );

  inherit( Node, TheStringNode );

  return TheStringNode;
} );
