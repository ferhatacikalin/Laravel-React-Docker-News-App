import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async (current_page, keyword , begin, end) => {
        console.log({ begin, end });
        try {
            current_page++;
            const response = await http.get("articles", {
                params: { page: current_page  , start_date: begin , end_date: end },
            });
            return response.data;
        } catch (error) {
            throw new Error("Error fetching news data.");
        }
    }
);

const newsSlice = createSlice({
    name: "news",
    initialState: {
        articles: [],
        loading: false,
        error: null,
        current_page: 0,
        last_page: 1,
        per_page: 50,
        total: 0,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                if (action.payload.pagination.current_page == 1) {
                    state.articles = action.payload.articles;
                } else {
                    state.articles = [
                        ...state.articles,
                        ...action.payload.articles,
                    ];
                }
                state.current_page = action.payload.pagination.current_page;
                state.last_page = action.payload.pagination.last_page;
                state.per_page = action.payload.pagination.per_page;
                state.total = action.payload.pagination.total;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectArticles = (state) => state.news.articles;
export const selectLoading = (state) => state.news.loading;
export const selectError = (state) => state.news.error;
export const selectCurrentPage = (state) => state.news.current_page;
export const selectLastPage = (state) => state.news.last_page;
export const selectPerPage = (state) => state.news.per_page;
export const selectTotal = (state) => state.news.total;

export default newsSlice.reducer;
