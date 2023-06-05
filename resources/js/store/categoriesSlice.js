import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
    "categories/edit",
    async () => {
        try {

            const response = await http.get("categories/edit");
            return response.data;
        } catch (error) {
            throw new Error("Error fetching news data.");
        }
    }
);
export const setSelectedCategories = createAsyncThunk("categories/update", async (selected) => {
    console.log(selected);
    try {
        const response = await http.post("categories/update", {categories:selected});
        return response.data;
    } catch (error) {
        throw new Error("Error fetching news data.");
    }
});
const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        selectedCategories: [],
        loading: false,
        error: null,
    },
    reducers: {
        // other reducers...
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
               state.categories = action.payload.categories;
               state.selectedCategories = action.payload.selectedCategories;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).addCase(setSelectedCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(setSelectedCategories.fulfilled, (state, action) => {
                state.selectedCategories = action.payload.selectedCategories;
                state.loading = false;
                state.error = null;
            }).addCase(setSelectedCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            }
        );
    },
});

export const selectCategories = (state) => state.categories.categories;
export const selectSelectedCategories = (state) => state.categories.selectedCategories;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;


export default categoriesSlice.reducer;
