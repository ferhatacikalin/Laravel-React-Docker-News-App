import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNews,
    selectArticles,
    selectLoading,
    selectError,
} from "../store/newsSlice";
import { selectSelectedCategories } from "../store/categoriesSlice";
import NewsCard from "./newsCard";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const NewsComponent = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const current_page = useSelector((state) => state.news.current_page);
    const last_page = useSelector((state) => state.news.last_page);
    const selectedCategories = useSelector(selectSelectedCategories);
    useBottomScrollListener(() => dispatch(fetchNews(current_page)), {
        debounce: 500,
    });

    useEffect(() => {
        dispatch(fetchNews(0));
    }, [selectSelectedCategories]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {articles.map((article) => (
                <NewsCard
                    title={article.title}
                    description={article.description}
                    imageUrl={article.image}
                    articleUrl={article.url}
                    category={article.category}
                    key={article.id}
                    source={article.source}
                />
            ))}
            {true && <div class="mx-auto  text-center">Loading...</div>}
        </div>
    );
};

export default NewsComponent;
