import { XMLParser } from "https://cdn.jsdelivr.net/npm/fast-xml-parser@4.4.1/+esm";

// Examples
// Al Jokes: https://www.youtube.com/feeds/videos.xml?channel_id=UCupQd0e1leK4-Mj1wSfnkoQ
// Alan Becker: https://www.youtube.com/feeds/videos.xml?channel_id=UCbKWv2x9t6u8yZoB3KcPtnw


const url_params = new URLSearchParams(window.location.search);

const channels = url_params
	.get("channels")
	.split(",")
	.map(item => item.trim());

console.log(channels);

channels.forEach(it => alert(it));

// const parser = new XMLParser();

// async function fetchRSS(url)
// {
// 	const res = await fetch(url);
// 	const xml = await res.text();

// 	const obj = parser.parse(xml);
// 	console.log(obj);

// return obj;
// }

// fetchRSS("https://example.com/feed.rss");
