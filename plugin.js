CKEDITOR.plugins.add('disqus', {
	requires: 'widget',
	lang: 'en,ru,uk',
	icons: 'disqus',
	init: function(editor){
		var setCommandState = function(){
			this.commands.disqus.setState(this.document.findOne('#disqus_thread')
				? CKEDITOR.TRISTATE_DISABLED
				: CKEDITOR.TRISTATE_OFF
			);
		};

		editor.widgets.add('disqus', {
			template: '<div id="disqus_thread"></div>',
			button: editor.lang.disqus.label,

			upcast: function(element){
				return element.name == 'div' && element.attributes.id == 'disqus_thread';
			},
			data: function(){
				this.element.appendHtml(
					'<script>'
						+'var disqus_config = function(){'
							+'this.page.title = "' + document.title + '";'
							+'this.page.url = "' + window.location.href + '";'
							+'this.page.identifier = "' + window.location.pathname + '";'
						+'};'
						+'(function(){'
							+'var d = document, s = d.createElement(\'script\');'
							+'s.src = \'https://' + editor.config.disqus_forum_url + '.disqus.com/embed.js\';'
							+'s.setAttribute(\'data-timestamp\', +new Date());'
							+'(d.head || d.body).appendChild(s);'
						+'})();'
					+'</script>'
					+'<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>'
				);
			}
		});

		editor.on('instanceReady', setCommandState);
		editor.on('change', setCommandState);

		CKEDITOR.document.appendStyleSheet(this.path + 'css/disqus.css');
	}
});

