import { XMLParser } from "https://cdn.jsdelivr.net/npm/fast-xml-parser@4.4.1/+esm";

// Examples
// Al Jokes: https://www.youtube.com/feeds/videos.xml?channel_id=UCupQd0e1leK4-Mj1wSfnkoQ
// Alan Becker: https://www.youtube.com/feeds/videos.xml?channel_id=UCbKWv2x9t6u8yZoB3KcPtnw


const url_params = new URLSearchParams(window.location.search);

const channels = url_params
	.get("channels")
	.split(",")
	.map(item => item.trim());

const parser = new XMLParser();

async function fetch_rss(channel_id)
{
	const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`
	const response = await fetch(url);
	const xml = await response.text();
	const object = parser.parse(xml);
	alert(object); // TEST
	return object;
}

channels.forEach(it => fetch_rss(it));
