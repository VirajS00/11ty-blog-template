module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/sass/');
	eleventyConfig.addPassthroughCopy('./src/js');

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!--more-->'
	});

	return {
		dir: {
			input: 'src',
			output: 'public'
		}
	};
};
