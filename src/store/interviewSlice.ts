// interviewsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  channel: string;
}

interface InterviewState {
  currentVideo: Video | null;
  showPlayer: boolean;
}

const initialState: InterviewState = {
  currentVideo: null,
  showPlayer: false,
};

const interviewsSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<Video>) => {
      state.currentVideo = action.payload;
      state.showPlayer = true;
    },
    closePlayer: state => {
      state.showPlayer = false;
    },
    togglePlayer: state => {
      state.showPlayer = !state.showPlayer;
    },
  },
});

export const { setCurrentVideo, closePlayer, togglePlayer } =
  interviewsSlice.actions;
export default interviewsSlice.reducer;
