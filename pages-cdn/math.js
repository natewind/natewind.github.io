window.onload = function()
{
	/*var span = document.createElement("span");
	span.style.color = "white";
	span.textContent = "9. ";
	var ols = document.getElementsByTagName("ol");
	ols[0].prepend(span);

	width = (span.offsetWidth + 1) + "px";
	span.remove();
	alert(width);

	for(var i = 0; i < ols.length; ++i)
	{
		ols[i].style.paddingLeft = width;
	}*/

	var tex = document.getElementsByTagName("tex");
	for(var i = 0; i < tex.length; ++i)
		tex[i].textContent = "\r" + tex[i].textContent + "\r";

	var script = document.createElement("script");
	script.src = "http://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";

	var config = 'MathJax.Hub.Config({'
	           + 'extensions: ["tex2jax.js"],'
	           + 'jax: ["input/TeX", "output/HTML-CSS"],'
	           + 'tex2jax: { inlineMath: [["\\r", "\\r"]] }'
	           + '});'
	           + 'MathJax.Hub.Startup.onload();';

	script.textContent = config;
	document.head.appendChild(script);
};
