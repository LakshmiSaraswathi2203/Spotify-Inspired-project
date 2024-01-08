console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0;
let audioElement=new Audio('1.mp3');
let marsterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Akkad-Bakkad",   filePath:"songs/1.mp3", coverPath: "cover1.jpg"},
    {songName:"Master JD intro",filePath:"songs/2.mp3", coverPath: "cover2.jpg"},
    {songName:"Cheliya-Cheliya",filePath:"songs/3.mp3", coverPath: "cover3.jpg"},
    {songName:"Nare-Nare",      filePath:"songs/4.mp3", coverPath: "cover4.jpg"},
    {songName:"Akh-Lad-Jave",   filePath:"songs/5.mp3", coverPath: "cover5.jpg"},
    {songName:"Randall-wahran", filePath:"songs/6.mp3", coverPath: "cover6.jpg"},
    {songName:"Jimmiki-Ponnu",  filePath:"songs/7.mp3", coverPath: "cover7.jpg"},
    {songName:"Yaar Alaipadhu", filePath:"songs/8.mp3", coverPath: "cover8.jpg"},
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//handle play pause
marsterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        marsterPlay.classList.remove('fa-play-circle');
        marsterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        marsterPlay.classList.remove('fa-pause-circle');
        marsterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value * audioElement.duration) /100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle'); 
        element.classList.add('fa-play-circle');    
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src= `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        marsterPlay.classList.remove('fa-play-circle');
        marsterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7)
    {
        songIndex=0;
    }
    else{
    songIndex+=1;
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
        audioElement.play();
        marsterPlay.classList.remove('fa-play-circle');
        marsterPlay.classList.add('fa-pause-circle');
    }
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else{
    songIndex-=1;
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
        audioElement.play();
        marsterPlay.classList.remove('fa-play-circle');
        marsterPlay.classList.add('fa-pause-circle');
    }
})
