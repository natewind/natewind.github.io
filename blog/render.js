import markdownIt from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm";
import markdownItAnchor from "https://cdn.jsdelivr.net/npm/markdown-it-anchor@9.2.0/+esm";
import markdownItTableOfContents
	from "https://cdn.jsdelivr.net/npm/markdown-it-table-of-contents@0.9.0/+esm";


const md = markdownIt();
const toc_marker = "[[toc]]\n\n";

md.use(markdownItAnchor);
md.use(markdownItTableOfContents,
{
	includeLevel: [1, 2, 3],
	containerClass: "nav"
});

// TODO: Consider:
// git submodule add https://github.com/markdown-it/markdown-it.git vendor/markdown-it
// git submodule update --init --recursive

// TODO: Automatically fix relative links?
// TODO: Set <html lang="ru"> for the libertarian playlist?

document.addEventListener("DOMContentLoaded", function()
{
	function load_article()
	{
		const article = window.location.hash.substring(2);
		const path = `articles/${article}.md`;

		fetch(path)
			.then(response => response.text())
			.then(text =>
			{
				const md = markdownIt();
				const rendered = md.render(toc_marker + text);
				document.body.innerHTML = rendered;
				document.title = document.querySelector("h1").textContent;
			})
			.catch(error => console.error("Error loading the Markdown article: ", error));
	}

	window.addEventListener("hashchange", load_article);
	load_article();
});
