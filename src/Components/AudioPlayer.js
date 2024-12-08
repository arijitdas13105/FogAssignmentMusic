import React, { useEffect, useState } from 'react'
import Artist from '../assets/Artist.png'
import SidePic from '../assets/Pic.png'
import { FaMusic, FaSearch, FaPlay, FaPause } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { FaArrowTrendUp, FaCompass, FaShuffle } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BsRepeat } from "react-icons/bs";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import beatIt from '../assets/songs/beatIt.mp3'
import billieJean from '../assets/songs/billieJean.mp3'
import smoothCriminal from '../assets/songs/smoothCriminal.mp3'
import { useDispatch, useSelector } from 'react-redux';
import { addSongArtist, addSongDuration, addSongImage, addSongMusic, addSongTitle } from '../Slices/PlayingSongSlice';
import ReactPlayer from 'react-player';

function AudioPlayer() {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  const [isPlaying, setIsPlaying] = useState(false);

  const songList = [
    { id: 1, title: 'Beat It', playing: 33494, time: 30, album: 'The Weekend', artist: 'The Weekend', image: Artist, music: beatIt },
    { id: 2, title: 'Billie Jean', playing: 33494, time: 35, album: 'The Weekend', artist: 'The Weekend', image: Artist, music: billieJean },
    { id: 3, title: 'Smooth Criminal', playing: 33494, time: 21, album: 'The Weekend', artist: 'The Weekend', image: Artist, music: smoothCriminal },
  ];

  const selectedSongTitle = useSelector((state) => state.playingSong.songTitle);
  const selectedSongArtist = useSelector((state) => state.playingSong.songArtist);
  const selectedSongImage = useSelector((state) => state.playingSong.songImage);
  const selectedSongMusic = useSelector((state) => state.playingSong.songMusic);
  const selectedSongDuration = useSelector((state) => state.playingSong.songDuration);

  const handleSongClick = (song) => {
    dispatch(addSongArtist(song.artist));
    dispatch(addSongTitle(song.title));
    dispatch(addSongImage(song.image));
    dispatch(addSongMusic(song.music));
    dispatch(addSongDuration(song.time));
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className='w-screen h-screen bg-red-300 flex flex-row'>
        {/* Left Sidebar */}
        <div className='w-[20%] h-screen bg-[#0E0E0E] flex flex-col px-10 py-10'>
          {/* Logo */}
          <div className='flex flex-row gap-5'>
            <FaMusic size="30px" color="#FF5353" />
            <div className='flex flex-row font-semibold text-2xl'>
              <h1 className='text-[#FF5353]'>Dream</h1>
              <h1 className='text-white'>Music</h1>
            </div>
          </div>
          {/* Menu */}
          <div className='flex flex-col mt-10 text-white'>
            <span className='text-xs'>MENU</span>
            <div className='flex flex-col px-1 gap-2'>
              <div className='flex flex-row items-center gap-2'>
                <TiHome color="#FF5353" size="18px" />
                <span>Home</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <FaArrowTrendUp color="#FF5353" size="18px" />
                <span>Trends</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <FaMusic color="#FF5353" size="18px" />
                <span>Library</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <FaCompass color="#FF5353" size="18px" />
                <span>Discover</span>
              </div>
            </div>
          </div>
          {/* General */}
          <div className='text-white flex flex-col absolute bottom-12'>
            <span className='text-xs'>General</span>
            <div className='flex flex-col px-1 gap-1'>
              <div className='flex flex-row items-center gap-2'>
                <IoSettings color="#FF5353" size="18px" />
                <span>Setting</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <MdLogout color="#FF5353" size="18px" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className='w-[60%] h-screen bg-red-400 flex flex-col'>
          {/* Header */}
          <div className='flex flex-row justify-between py-10 px-10 bg-[#440101]'>
            <div className='flex flex-row w-1/2 p-1'>
              <ul className='flex flex-row gap-10 text-white'>
                <li><a href="#">Music</a></li>
                <li><a href="#">Podcast</a></li>
                <li><a href="#">Live</a></li>
                <li><a href="#">Radio</a></li>
              </ul>
            </div>
            {/* Search */}
            <div className='border rounded-full p-1 w-2/3 flex bg-[#2C0000] justify-between px-6 items-center'>
              <input type="text" placeholder='search' className='w-full bg-[#2C0000] border-none outline-none text-white' />
              <FaSearch size="20px" color="white" />
            </div>
          </div>
          {/* Song Image */}
          <div className='w-full bg-[#440101] flex items-center justify-center'>
            <img src={selectedSongImage || Artist} className='w-[100%]' />
          </div>
          {/* Song List */}
          <div className='bg-[#440101] w-full h-full py-5 px-20 text-white'>
            <div className='flex flex-row justify-between'>
              <span>Popular</span>
              <span>See All</span>
            </div>
            <div className='mt-5'>
              <table className='w-full text-center'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className='text-start px-10 w-2/5'>TITLE</th>
                    <th>PLAYING</th>
                    <th>TIME</th>
                    <th className='text-end'>ALBUM</th>
                  </tr>
                </thead>
                <tbody>
                  {songList.map((song) => (
                    <tr key={song.id} onClick={() => handleSongClick(song)}>
                      <td>{song.id}</td>
                      <td className='px-6 flex flex-row text-start items-center'>
                        <img src={song.image} className='w-10 h-10' />
                        <span>{song.title}</span>
                      </td>
                      <td>{song.playing}</td>
                      {/* <td>{formatTime(song.time)}</td> */}
                      <td>{formatTime(song.time)}</td>
                      <td className='text-end'>{song.album}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Now Playing */}
        <div className='w-[20%] h-screen bg-[#1D0B0B] text-white items-center flex justify-center'>
          <div className='px-15 py-3 gap-3 bg-[#6B0000] rounded-xl absolute bottom-5 self-center items-center flex flex-col justify-center border-black border-2'>
            <span>Now playing</span>
            <img src={SidePic} className='w-[90%]' />
            <div className='flex flex-col items-center'>
              <span>{selectedSongTitle || 'Select a song'}</span>
              <span>{selectedSongArtist}</span>
            </div>
            {/* Progress Bar */}
            <div className='w-full px-6'>
              <div className='w-full h-2 bg-gray-500 rounded-full overflow-hidden'>
                <div
                  className='h-2 bg-red-600'
                  style={{ width: `${(currentTime / selectedSongDuration) * 100}%` }}
                ></div>
              </div>
              <div className='flex justify-between text-xs mt-2'>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(selectedSongDuration)}</span>
              </div>
            </div>
            <div className='flex flex-row items-center gap-4 mt-2'>
              <IoMdSkipBackward size="20px" />
              {isPlaying
                ? <FaPause size="20px" onClick={handlePlayPause} />
                : <FaPlay size="20px" onClick={handlePlayPause} />}
              <IoMdSkipForward size="20px" />
            </div>
          </div>
        </div>
      </div>
      {/* React Player */}
      {selectedSongMusic && (
        <ReactPlayer
          url={selectedSongMusic}
          playing={isPlaying}
          width="0"
          height="0"
          onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        />
      )}
    </>
  );
}



export default AudioPlayer;
