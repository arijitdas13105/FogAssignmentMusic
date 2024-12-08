import React, { useRef, useEffect, useState } from "react";
import Artist from "../assets/Artist.png";
import SidePic from "../assets/Pic.png";
import img1 from "../assets/1.png";
import img2 from "../assets/4.png";
import img3 from "../assets/3.png";
import { FaMusic, FaSearch, FaPlay, FaPause } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { FaArrowTrendUp, FaCompass, FaShuffle } from "react-icons/fa6";
import { IoSettings, IoSearchOutline } from "react-icons/io5";
import { MdLogout, MdSkipPrevious } from "react-icons/md";
import { BsRepeat } from "react-icons/bs";
import {
  IoMdSkipForward,
  IoMdSkipBackward,
  IoIosMusicalNotes,
} from "react-icons/io";
import beatIt from "../assets/songs/beatIt.mp3";
import billieJean from "../assets/songs/billieJean.mp3";
import smoothCriminal from "../assets/songs/smoothCriminal.mp3";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongArtist,
  addSongDuration,
  addSongImage,
  addSongMusic,
  addSongTitle,
} from "../Slices/PlayingSongSlice";
import ReactPlayer from "react-player";
function MainComponent() {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 258; 
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const songList = [
    {
      id: 1,
      title: "Beat It",
      playing: 33494,
      time: 30,
      album: "The Weekend ",
      artist: "The Weekend",
      image: img1,
      music: beatIt,
    },
    {
      id: 2,
      title: " Billie Jean ",
      playing: 33494,
      time: 35,
      album: "The Weekend",
      artist: "The Weekend",
      image: img2,
      music: billieJean,
    },
    {
      id: 3,
      title: "Smooth Criminal",
      playing: 33494,
      time: 21,
      album: "The Weekend",
      artist: "The Weekend",
      image: img3,
      music: smoothCriminal,
    },
    // {id:4,title:'TimeLess', playing:33494, time:'3:45',album:'The Weekend', artist:'The Weekend',image:Artist},
    // {id:5,title:'TimeLess', playing:33494, time:'3:45',album:'The Weekend', artist:'The Weekend',image:Artist},
  ];

  const selectedSongTitle = useSelector((state) => state.playingSong.songTitle);
  const selectedSongArtist = useSelector(
    (state) => state.playingSong.songArtist
  );
  const selectedSongImage = useSelector((state) => state.playingSong.songImage);
  const selectedSongMusic = useSelector((state) => state.playingSong.songMusic);
  const selectedSongDuration = useSelector(
    (state) => state.playingSong.songDuration
  );

  const handleSongClick = (song) => {
    // console.log("song",song)
    dispatch(addSongArtist(song.artist));
    dispatch(addSongTitle(song.title));
    dispatch(addSongImage(song.image));
    dispatch(addSongMusic(song.music));
    dispatch(addSongDuration(song.time));
    setIsPlaying(true);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const nextSong = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * songList.length);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
    }
  };

  const previousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songList.length - 1 : prevIndex - 1
    );
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
    if (repeat) {
      playerRef.current.seekTo(0, "seconds");
    }
  };

  useEffect(() => {
    const song = songList[currentSongIndex];
    dispatch(addSongArtist(song.artist));
    dispatch(addSongTitle(song.title));
    dispatch(addSongImage(song.image));
    dispatch(addSongMusic(song.music));
    dispatch(addSongDuration(song.time));
  }, [currentSongIndex]);

  return (
    <>
      <div className="w-screen h-screen bg-red-300 flex flex-row">
        {/* left part */}
        <div className="w-[20%] h-screen bg-[#0E0E0E] flex flex-col  px-10 py-10 ">
          <div className="flex flex-row gap-5">
            <FaMusic size="30px" color="#FF5353" />

            <div className="flex flex-row font-semibold text-2xl">
              <h1 className="text-[#FF5353] ">Dream</h1>
              <h1 className="text-white">Music</h1>
            </div>
          </div>
          <div className="flex flex-col mt-10 text-white">
            <span className="text-xs"> MENU</span>
            <div className="flex flex-col px-1 gap-2">
              <div className="flex flex-row items-center gap-2">
                <TiHome color="#FF5353" size="18px" />

                <span>Home</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaArrowTrendUp color="#FF5353" size="18px" />

                <span>Trends</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaMusic color="#FF5353" size="18px" />

                <span>Library</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaCompass color="#FF5353" size="18px" />

                <span>Discover</span>
              </div>
              {/* <span>Home</span>
            <span>Trends</span>
            <span>Library</span>
            <span>Discover</span> */}
            </div>
          </div>
          <div className="text-white flex flex-col absolute bottom-12">
            <span className="text-xs">General</span>
            <div className="flex flex-col px-1 gap-1">
              <div className="flex flex-row items-center gap-2">
                <IoSettings color="#FF5353" size="18px" />

                <span>Setting</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <MdLogout color="#FF5353" size="18px" />

                <span>Logout</span>
              </div>
              {/* <span>Settings</span>
            <span>Log out</span> */}
            </div>
          </div>
        </div>
        {/* middle part */}
        <div className="w-[60%] h-screen   bg-gradient-to-b from-[#3F0101] to-[#210707] flex flex-col">
          {/* header */}
          <div className=" flex flex-row justify-between py-10 px-10 ">
            <div className="flex flex-row w-1/2 p-1">
              <ul className="flex flex-row gap-10 text-white">
                <li>
                  {" "}
                  <a href="#">Music</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Podcast</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Live</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Radio</a>{" "}
                </li>
              </ul>
            </div>
            {/* search */}
            <div className="  border rounded-full  p-1 w-2/3 flex bg-[#2C0000]  justify-between px-6 items-center border-none ">
              <input
                type="text"
                placeholder="search"
                className="w-full bg-[#2C0000] border-none outline-none text-white "
              />
              <FaSearch size="20px" color="white" />
            </div>
          </div>
          {/* song main image */}
          <div className="w-full    ">
            <div className="w-full flex items-center justify-center self-center px-20  ">
              <img src={Artist} className="w-[100%]  " />
            </div>
          </div>
          {/* song list */}
          <div className=" w-full h-full py-5  text-white ">
            <div className="flex flex-row justify-between px-20 ">
              <span>Popular</span>
              <span>See All</span>
            </div>

            <div className=" mt-5  px-20 flex-wrap flex ">
              <table className=" w-full  text-center   ">
                <thead>
                  <tr className="">
                    <th className="">#</th>
                    <th className="  text-start px-10 w-2/5 font-[500] font-[28px] text-[#CFC5C5] ">
                      TITLE
                    </th>
                    <th className="font-[500] text-[#CFC5C5] ">PLAYING</th>
                    <th className="font-[500] text-[#CFC5C5] ">TIME</th>
                    <th className="font-[500] text-[#CFC5C5]  text-end">
                      ALBUM
                    </th>
                  </tr>
                </thead>
                <tbody className=" [&>tr>td]:py-1  [&>tr]:mt-5 ">
                  {songList.map((song, index) => (
                    <tr
                      key={song.id}
                      className={`${
                        selectedSongTitle === song.title
                          ? "bg-[#d43030] rounded-lg "
                          : "bg-transparent"
                      } cursor-pointer`}
                      onClick={() => handleSongClick(song)}
                    >
                      <td className="">
                        {" "}
                        {selectedSongTitle === song.title ? (
                          <IoIosMusicalNotes
                            className=" text-white"
                            size="25px"
                          />
                        ) : (
                          song.id
                        )}
                      </td>
                      <td className=" px-6 flex flex-row text-start items-center">
                        <img src={song.image} className="w-10 h-10" />
                        <span> {song.title} </span>
                      </td>
                      <td className=" "> {song.playing} </td>
                      <td className=""> {formatTime(song.time)} </td>
                      <td className="text-end"> {song.album} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="w-[20%] h-screen bg-[#1D0B0B] text-white items-center  flex justify-center">
          <div className="px-15 py-3   gap-3 bg-[#6B0000] rounded-xl absolute bottom-5 self-center items-center flex flex-col justify-center border-black border-2">
            <span>Now playing</span>
            <img src={SidePic} className="w-[90%] " />
            <div className="flex flex-col items-center">
              {/* <span>Beat IT</span> */}
              <span>{selectedSongTitle || "Select a song"}</span>
              {/* <span>Micheal Jackson</span> */}
              <span>{selectedSongArtist}</span>
            </div>
            {/* <div> song time </div> */}
            {/* ------------- */}
            <div className="w-full px-6">
              <div
                className="w-full h-1 bg-gray-500 rounded-full overflow-hidden"
                onClick={(e) => {
                  const progressBar = e.currentTarget;
                  const rect = progressBar.getBoundingClientRect();
                  const clickX = e.clientX - rect.left; // Click position relative to the progress bar
                  const newTime =
                    (clickX / progressBar.offsetWidth) * selectedSongDuration;
                  setCurrentTime(newTime); // Update current time state
                  playerRef.current.seekTo(newTime, "seconds"); // Seek to the new time
                }}
              >
                <div
                  className="h-1 bg-white"
                  style={{
                    width: `${(currentTime / selectedSongDuration) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(selectedSongDuration)}</span>
              </div>
            </div>

            {/* ------------- */}
            {console.log("isSuffle", repeat)}
            <div className="flex flex-row justify-between  w-full px-6 items-center">
              <BsRepeat
                size="20px"
                onClick={handleRepeat}
                color={repeat ? "gray" : "white"}
              />
              <div className="flex flex-row gap-3  items-center">
                <IoMdSkipBackward size="20px" onClick={previousSong} />
                <div
                  className="bg-[#480000] p-2 rounded-md"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPlay size="20px" /> : <FaPause size="20px" />}
                  {/* <FaPlay size="20px" />   */}
                </div>
                <IoMdSkipForward size="20px" onClick={nextSong} />
              </div>
              <FaShuffle size="20px" onClick={() => setShuffle(!shuffle)} />
            </div>
          </div>
        </div>
      </div>
      <ReactPlayer
        ref={playerRef}
        url={selectedSongMusic}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onEnded={() => setIsPlaying(false)} 
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
      />
    </>
  );
}

export default MainComponent;
