const codeStyleHooks = require('eleventy-plugin-code-style-hooks');
const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes) {
	let metadata = await Image(src, {
		widths: [300],
		formats: ['avif', 'webp', 'jpeg'],
		outputDir: './public/img'
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: 'lazy',
		decoding: 'async'
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes, {
		whitespaceMode: 'inline'
	});
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/sass/');
	eleventyConfig.addPassthroughCopy('./src/js');
	eleventyConfig.addPassthroughCopy('./src/img');
	eleventyConfig.addPlugin(codeStyleHooks);

	eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
	eleventyConfig.addLiquidShortcode('image', imageShortcode);
	eleventyConfig.addJavaScriptFunction('image', imageShortcode);

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
