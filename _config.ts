import lume from "lume/mod.ts";

import esbuild from "lume/plugins/esbuild.ts";
import sitemap from "lume/plugins/sitemap.ts";
import inline from "lume/plugins/inline.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import metas from "lume/plugins/metas.ts";

const site = lume({
	/** required for sitemap() */
	location: new URL("http://vsdent.sk"),
});

site
	.copy("css")
	.copy("img")
	.copy("svg")
	.use(metas())
	.use(sitemap())
	.use(inline())
	.use(minifyHTML())
	.use(esbuild({
		extensions: [".js", ".ts"],
		options: { treeShaking: true, minify: true },
	}))
	/** automaticly copy static files based on css import */
	.use(lightningCss({
		options: { minify: true },
	}));

export default site;
