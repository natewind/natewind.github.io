import markdownIt from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm";
import markdownItAnchor from "https://cdn.jsdelivr.net/npm/markdown-it-anchor@9.2.0/+esm";
import markdownItTableOfContents
	from "https://cdn.jsdelivr.net/npm/markdown-it-table-of-contents@0.9.0/+esm";

// TODO: MathJax for LaTeX!
// TODO: [CSS] Horizontally scrollable tables (check in Telegram WebView)
// TODO: Try the 404 redirect method for clean links? /blog/article

const md = markdownIt();
const toc_marker = "[[toc]]\n\n";

// TODO: Add param to exclude Unicode from anchor links

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
		const url_params = new URLSearchParams(window.location.search);
		const article = url_params.get("article");

		if (!article)
			// TODO: Redirect to https://t.me/s/<channel-username>
			// TODO: Same if article doesn’t exist?
			return;

		const path = `articles/${article}.md`;

		fetch(path)
			.then(response => response.text())
			.then(text =>
			{
				const rendered = md.render(toc_marker + text);
				document.body.innerHTML = rendered;

				document.title = document.querySelector("h1").textContent;

				const toc = document.querySelector("nav");
				const main = document.createElement("main");

				const children = document.createRange();
				children.setStartAfter(toc);
				children.setEndAfter(document.body.lastChild);

				main.appendChild(children.extractContents());
				document.body.appendChild(main);
			})
			.catch(error => console.error("Error loading the Markdown article: ", error));
	}

	load_article();
});
