/**
 * @license Copyright (c) 2003-2022, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals window, document, console:false */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ArticlePluginSet from '@ckeditor/ckeditor5-core/tests/_utils/articlepluginset';
import BalloonToolbar from '../../../src/toolbar/balloon/balloontoolbar';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		image: { toolbar: [ 'toggleImageCaption', 'imageTextAlternative' ] },
		plugins: [ ArticlePluginSet, BalloonToolbar ],
		toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo' ],
		balloonToolbar: [ 'bold', 'italic', 'link' ]
	} )
	.then( editor => {
		window.editor = editor;

		const balloonToolbar = editor.plugins.get( 'BalloonToolbar' );

		balloonToolbar.on( 'show', evt => {
			const selectionRange = editor.model.document.selection.getFirstRange();
			const blockRange = editor.model.createRangeOn( editor.model.document.getRoot().getChild( 0 ) );

			if ( selectionRange.containsRange( blockRange ) || selectionRange.isIntersecting( blockRange ) ) {
				evt.stop();
			}
		}, { priority: 'high' } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
