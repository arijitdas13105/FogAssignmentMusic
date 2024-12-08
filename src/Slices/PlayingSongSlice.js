import { createSlice } from '@reduxjs/toolkit'

const playingSongSlice = createSlice({
    name: 'playingSong',
    initialState:{
        songTitle:'',
        songImage:'',
        songMusic:null,
        songArtist:'',
        songDuration:null
    },

    reducers:{
        addSongTitle:(state,action) => {
            state.songTitle = action.payload
        },
        addSongImage:(state,action) => {
            state.songImage = action.payload
        },
        addSongMusic:(state,action) => {
            state.songMusic = action.payload
        },
        addSongArtist:(state,action) => {
            state.songArtist = action.payload
        },
        addSongDuration:(state,action) => {
            state.songDuration = action.payload
        }
    }   
})

export const {addSongTitle,addSongImage,addSongMusic,addSongArtist,addSongDuration} = playingSongSlice.actions
export default playingSongSlice.reducer