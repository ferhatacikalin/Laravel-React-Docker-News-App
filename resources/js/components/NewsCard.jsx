import { get } from "lodash";

function isValidUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}
function limitString(string, maxLength) {
    if (string.length <= maxLength) {
        return string;
    } else {
        return string.substring(0, maxLength) + "...";
    }
}
function getValidUrl(url, articleUrl, title, category, source) {
    if (!isValidUrl(url)) {
        if (url === null) {
            console.log(
                "https://source.unsplash.com/300x200/?" +
                    encodeURIComponent(title)
            );
            return (
                "https://source.unsplash.com/300x200/?" +
                encodeURIComponent(title)
            );
        }
        const baseUrl = get(new URL(articleUrl), "origin", "");
        return baseUrl + "/" + url;
    }
    return url;
}
const NewsCard = ({ title, description, imageUrl, articleUrl }) => {
    const handleClick = () => {
        window.open(articleUrl, "_blank");
    };
    const validImageUrl = isValidUrl(imageUrl)
        ? imageUrl
        : getValidUrl(imageUrl, articleUrl, title);
    return (
        <div
            onClick={handleClick}
            className="max-w-full rounded overflow-hidden shadow-lg cursor-pointer"
        >
            <img
                className="h-64 w-full object-cover"
                src={validImageUrl}
                alt="News"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {limitString(description?.replaceAll(/<\/?[^>]+(>|$)/gi, ""), 100)}
                </p>
            </div>
        </div>
    );
};

export default NewsCard;
