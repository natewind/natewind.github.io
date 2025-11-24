import { XMLParser } from "https://cdn.jsdelivr.net/npm/fast-xml-parser/+esm";
import { formatDistanceToNowStrict } from "https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm";

const fetch_rss = (() => {
	const parser = new XMLParser({ ignoreAttributes: false });

	return async function(channel_id)
	{
		const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`;
		const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

		const response = await fetch(proxy);
		const text = await response.text();
		const xml = JSON.parse(text).contents;
		return parser.parse(xml);
	};
})();

function get_videos(rss)
{
	const feed = rss.feed;

	return feed.entry.map(entry =>
	({
		link: entry.link["@_href"],
		thumbnail: entry["media:group"]["media:thumbnail"]["@_url"],
		title: entry.title,
		channel: feed.title,
		date: new Date(entry.published),
	}))
}

function create_card(video)
{
	const card = document.createElement("a");
	card.href = video.link;

	const thumbnail = document.createElement("img");
	thumbnail.src = video.thumbnail;
	thumbnail.alt = video.title;

	const title = document.createElement("h2");
	title.textContent = video.title;

	const channel = document.createElement("cite");
	channel.textContent = video.channel;

	const date = document.createElement("time");
	date.textContent = formatDistanceToNowStrict(video.date);
	date.dateTime = video.date.toISOString();

	card.append(thumbnail, title, channel, date);
	return card;
}

const body = document.body;
const url_params = new URLSearchParams(window.location.search);

const rss_promises = url_params
	.get("channels")
	.split(",")
	.map(item => item.trim())
	.map(fetch_rss);

const channels = await Promise.all(rss_promises);

cards = channels
	.flatMap(get_videos)
	.filter(video => video.link.includes("youtube.com/shorts"))
	.sort((a, b) => b.date - a.date)
	.map(create_card)
	.forEach(card => body.appendChild(card));
