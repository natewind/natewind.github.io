import { XMLParser } from "https://cdn.jsdelivr.net/npm/fast-xml-parser/+esm";

// Examples
// Al Jokes: https://www.youtube.com/feeds/videos.xml?channel_id=UCupQd0e1leK4-Mj1wSfnkoQ
// Alan Becker: https://www.youtube.com/feeds/videos.xml?channel_id=UCbKWv2x9t6u8yZoB3KcPtnw

const url_params = new URLSearchParams(window.location.search);

const channels = url_params
	.get("channels")
	.split(",")
	.map(item => item.trim());

console.log(`Parsed channel IDs: ${channels}`) // TEST

const parser = new XMLParser({ ignoreAttributes: false });

async function fetch_rss(channel_id)
{
	const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`
	const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
	const response = await fetch(proxy);
	const text = await response.text();
	const xml = JSON.parse(text).contents;
	const object = parser.parse(xml);
	return object;
}

// TODO: Filter out non-shorts (by link regex)
// TODO: Sort combined list
// TODO: Refactor into iterator chain

// <feed>
// 	<title>al jokes</title>
// 	<entry>
// 		<title>certified rock inspector #shorts #comedy #funny</title>
// 		<link rel="alternate" href="https://www.youtube.com/shorts/nDF5I8Sohag" />
// 		<published>2025-11-22T21:25:47+00:00</published>
// 		<media:group>
// 			<media:thumbnail url="https://i3.ytimg.com/vi/nDF5I8Sohag/hqdefault.jpg" />
// 		</media:group>
// 	</entry>
// </feed>

for (const channel_id of channels)
{
	const rss = await fetch_rss(channel_id);
	console.log(`Parsed channel RSS: ${rss}`) // TEST

	const feed = rss.feed;
	console.log(`Parsed channel feed: ${feed}`) // TEST

	const title = feed.title;
	console.log(`Title: ${title}`) // TEST

	for (const entry of feed.entry)
	{
		// const video_id = entry["yt:videoId"]

		console.log(`Video title: ${entry.title}`) // TEST
		console.log(`Link: ${entry.link["@_href"]}`) // TEST
		console.log(`Date: ${entry.published}`) // TEST
		console.log(`Thumbnail: ${entry["media:group"]["media:thumbnail"]["@_url"]}`) // TEST

		break; // TEST
	}

	break; // TEST
}
