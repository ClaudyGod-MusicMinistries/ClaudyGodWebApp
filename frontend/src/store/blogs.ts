import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

interface ArticleState {
  currentArticle: BlogPost | null;
}

const initialState: ArticleState = {
  currentArticle: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    openArticle: (state, action: PayloadAction<BlogPost>) => {
      state.currentArticle = action.payload;
    },
    closeArticle: (state) => {
      state.currentArticle = null;
    }
  }
});

export const { openArticle, closeArticle } = blogSlice.actions;
export default blogSlice.reducer;