import markdownIt from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm"

// TODO: Automatically fix relative links?
// TODO: Set <html lang="ru"> for the libertarian playlist?
document.addEventListener("DOMContentLoaded", function () {
	function loadMarkdown() {
		const hash = window.location.hash.substring(2);
		const article = hash;
		const filePath = `articles/${article}.md`;

		fetch(filePath)
			.then(response => response.text())
			.then(text => {
				const md = markdownIt();
				const result = md.render(text);
				document.body.innerHTML = result;
			})
			.catch(error => console.error("Error loading the markdown file:", error));
	}

	window.addEventListener("hashchange", loadMarkdown);
	loadMarkdown();
});
