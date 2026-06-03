import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  location?: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
}

const initialState: UserState = {
  name: 'Zahoor Ahmed',
  email: 'developervision32@gmail.com',
  location: 'Karachi, Sindh',
  role: 'Full Stack Developer',
  bio: 'Building delightful web and mobile experiences with React Native.',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<{ name?: string; bio?: string }>) => {
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.bio !== undefined) {
        state.bio = action.payload.bio;
      }
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;