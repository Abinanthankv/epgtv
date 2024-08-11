var player = videojs("myVideo", {
  playbackRates: [0.5, 1, 1.5, 2], // Optional playback rate options
  responsive: true,
  liveui: true,
   fill: true,
   enableSmoothSeeking: true,
   controls: true,
   controlBar: {
    skipButtons: {
      forward: 5,
     backward: 10, 
    },
   //disablePictureInPicture: true,
  // enableDocumentPictureInPicture: true
   // nativeControlsForTouch:true
  }

  // fluid: true,
  // aspectRatio: '9:16'
});
//player.controlBar.addChild('PictureInPictureToggle');

player.hlsQualitySelector({
  displayCurrentQuality: true,
  default: "highest",
});


const channelList = document.getElementById("channel-list");
//const scrollChannel = document.getElementById("scroll-channel");
//const epgList = document.getElementById("epg-list");
const channelName = document.getElementById("channel-name");
const channelLogo = document.getElementById("channel-logo");
const myVideo = document.getElementById("myVideo");
const filterLanguage = document.getElementById("language-filter");
const filterCategory = document.getElementById("channel-filter");
const channelInfo=document.getElementById("channel-info")
const channelid=document.getElementById("channel-list");
const videodata=document.getElementById("video-container");
const scrollableDiv = document.getElementById("your-scrollable-div");
const tagid=document.getElementsByClassName("nowplayingtag");
const HD=document.getElementById("toggle-HD");
const bd=document.getElementById("body");
const togglewidth=document.getElementById("toggle");
const startTimeElement = document.createElement('span');
const stopTimeElement = document.createElement('span');
const remainingTimeElement = document.querySelector('.vjs-remaining-time-display');
const scrollfab=document.querySelector('.fab');
//const minusSpan = document.querySelector('span[aria-hidden="false"]');
//console.log(minusSpan)
//minusSpan.style.display="none";
const epgstyle=document.getElementById("epg-scroll");

//console.log(remainingTimeElement)
// Initially empty
var activeChannel = "";
let filteredData;
let isShowHD = false; 
let nowspan="";
let  starttime="";
let stoptime="";
let  currtime="";
let  rtdtime="";
let duration="";
var channelID="";
var currentPlayingProgram = "";
var currentPlayingPrograminfo = "";



let timeoutId = null;

function detectBrowserAndDeviceType() {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);  


  if (userAgent.indexOf("Chrome") !== -1 || userAgent.indexOf("Chromium") !== -1) {
    return isMobile ? "Chrome Mobile" : "Chrome Desktop";
  } else if (userAgent.indexOf("Firefox") !== -1) {
    return isMobile ? "Firefox Mobile" : "Firefox Desktop";
  } else if (userAgent.indexOf("Safari") !== -1) {
    return isMobile ? "Safari Mobile" : "Safari Desktop";
  } else {
    return isMobile ? "Unknown Mobile" : "Unknown Desktop";
  }
}

function notifyUserForCorsExtension() {
  const browser = detectBrowserAndDeviceType();
  let extensionUrl;

  switch (browser) {
    case "Chrome Mobile":
      alert("We're sorry, but CORS extensions are not currently supported on Chrome mobile. You can try accessing this content on a desktop browser or consider using Firefox Mobile, which offers CORS extension support.");
     
      return; // Exit the function after displaying the message
    case "Firefox Mobile":
    case "Firefox Desktop":
      extensionUrl = "https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/";
      break;
    case "Chrome":
    case "Chrome Desktop":
      extensionUrl = "https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en";
      break;
    case "Safari Mobile":
    case "Safari Desktop":
      // Safari App Store link if available
      extensionUrl = "";
      break;
    default:
      alert("Unsupported browser");
      return;
  }

  const hasSeenMessage = sessionStorage.getItem('corsExtensionMessageShown');
  //hasSeenMessage='false';
  if (!hasSeenMessage) {
    const message = `You need to install a CORS extension to access this content. You can find extensions for your browser here:`;
    alert(`${message} \n ${extensionUrl}`);
    sessionStorage.setItem('corsExtensionMessageShown', 'true');
    //localStorage.setItem('corsExtensionMessageShown', 'true');
  }
}
//let isPipActive = false;
function toggleMiniplayer() {
 // if (isPipActive) return; 
// console.log(myVideo);
//const pipWindow =  documentPictureInPicture.requestWindow();
//const pipWindow = document.pictureInPictureElement;
//myVideo.requestPictureInPicture();
//myVideo.style.display="none";
//pipWindow.document.body.appendChild(videodata);
 //videodata.requestPictureInPicture();
 
}


window.addEventListener("scroll", function() {
  if (window.scrollY > 82) {  // Hide after 100px scroll
    channelInfo.style.display = "none";
    scrollfab.style.display="block";
   // epgstyle.style.overflowX="auto"

  } else {
    scrollfab.style.display="none";
    // epgstyle.style.overflowX="scroll"
    channelInfo.style.display = "flex";
    channelInfo.style.behavior= 'smooth'
  }
  if (window.scrollY >130 ||window.scrollX>100) {  // Hide after 100px scroll
  //  toggleMiniplayer();
 
   // myVideo.style.height=20+'vh';
   // myVideo.style.width=20+'vh';
   
   //epgstyle.style.overflowX="scroll";
  //epgstyle.style.position= "fixed" ;
//  epgstyle.style.top=0+'vh';
if (!document.pictureInPictureElement && !player.paused()) {
  player.requestPictureInPicture();
 }
 /*if(document.pictureInPictureElement){
 myVideo.style.display="flex";
 }
 else{
 // myVideo.style.display="block";
 }*/

  } else {
    if (document.pictureInPictureElement && !player.paused()) {
      player.exitPictureInPicture();
     }
   
  //epgstyle.style.overflowX="inherit"
    // epgstyle.style.overflowX="scroll"
   //epgstyle.style.top=82+'vh';
  }
});

const scrollToTopButton = document.getElementById('scroll-to-top');
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
filterCategory.addEventListener('keydown', preventArrowKeyChange);
filterLanguage.addEventListener('keydown', preventArrowKeyChange);
function preventArrowKeyChange(event) {
  if (event.keyCode === 38 || event.keyCode === 40||event.keyCode === 37 || event.keyCode === 39) { // Up and down arrow keys
    console.log(event.keyCode);
    event.preventDefault();
  }
}

document.addEventListener('DOMContentLoaded', function() {
 // notifyAndRedirect();
  //console.log("loaded");
  //load channel list
  fetch("./jio5.json")
  .then((response) => response.json())
  .then((data) => {
      //  filtereditemlist(data);
  });
  //load epgdata list
});  
function generateEPGList(epgData) {
  
  //epgList.innerHTML = ''; // Clear previous content

  // Iterate through EPG data items asynchronously using a loop
  (async () => {
    for (const item of epgData) {
      //console.log(item.name);
      const epgListItem = await getEPGDataById(item.id); // Fetch data for each item
      
      //console.log(epgListItem);
     // epgList.appendChild(epgListItem);
     /* if (epgListItem) { // Check if data is fetched successfully
        epgList.appendChild(epgListItem); // Add the generated list item
      } else {
        console.error(`Error fetching EPG data for item ID: ${item.id}`);
      }
        */
    }
  })();
}
  function filtereditemlist(filteredData) {
    
    channelList.innerHTML = "";
   // epgList.innerHTML="";
   // scrollChannel.innerHTML="";
    // to sort channel list alphabetically
    filteredData.sort((a, b) => a.name.localeCompare(b.name)).forEach((item) => {
     
    });
    //   
    
    for (const item of filteredData) {
      const listItem = document.createElement("li");
      listItem.id = "channelIDD";
    //  listItem.innerHTML=item.name;
      listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
    //  const scrollchannelid=document.createElement("li");
     // scrollchannelid.id="scrollchannelID"
     // scrollchannelid.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
      const nowPlayingSpan = document.createElement("span");
      nowPlayingSpan.id="nowplaying-span"// Add a class for styling
      nowPlayingSpan.innerText=item.name;
      listItem.appendChild(nowPlayingSpan);
      //scrollchannelid.appendChild(nowPlayingSpan);
      const ulepg= document.createElement("ul");
      ulepg.id=item.id;
      listItem.appendChild(ulepg);
      ulepg.classList.add('myClass');
     // listItem.appendChild(ulepg);
     // getEPGDataById(item.id);
      
      //generateEPGList(filteredData);
      //listItem.appendChild(epgList);
      listItem.addEventListener("click", (event) => {
     
      //  getEPGDataById(item.id);
        const clickedItem = event.target.closest('li');
       
       
        //listItem.appendChild(epgList);
        epgstyle.style.display="flex"; 
       videodata.style.display="block"; 
        notifyUserForCorsExtension();
        const channelInfo=document.getElementById("channel-info");
        channelID=item.id;
       channelInfo.style.display="flex";
        for (const channelItem of channelList.children) {
          channelItem.style.backgroundColor = "";
        }
        // to change css style
        listItem.style.backgroundColor="lightgreen";
       // var channelData =  getChannelDataById(item.epgid);
        channelLogo.src=item.logo; 
        var jiochannelData=getjioChannelDataById(item.id);
      //  updatetime(item.id);
        if (item.id != "") {
         player.src({
      src:`https://blah-engineers-lady-rpg.trycloudflare.com/app/live.php?id=${item.id}&e=.m3u`,
       //type: 'application/x-mpegURL',
        type: 'application/vnd.apple.mpegURL'
         });
         player.load();
          player.play();  
     
        }
        else{
          player.src({
            src:item.url,
             //type: 'application/x-mpegURL',
              type: 'application/vnd.apple.mpegURL'
               });
                player.load();
                player.play(); 

        }
        
      });
      
      channelList.appendChild(listItem);
    //  scrollChannel.appendChild(scrollchannelid);
      
     
    //  
    // epgList.appendChild(epglistItem);
  //  getEPGDataById(item.id);
    }
    generateEPGList(filteredData);
  }
fetch("./jio5.json")
  .then((response) => response.json())
  .then((data) => {
    // Extract unique groups (languages) and categories from your JSON data
    const uniqueGroups = [...new Set(data.map((item) => item.language))];
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    // Populate the filter select element with group (language) and category options
    uniqueGroups.sort().forEach((language) => {
      if(language==null ||language=="")
      {
        language="Others"
      }
      const option = document.createElement("option");
      option.value = language;
      option.text = language;
      filterLanguage.appendChild(option);
    });

    uniqueCategories.sort().forEach((category) => {
      const option = document.createElement("option");

      option.value = category;

      option.text = category;

      filterCategory.appendChild(option);
    });
    filterCategory.parentElement.appendChild(filterLanguage);
   
    filterCategory.addEventListener("change", () => {
      
      const selectedGroup = filterLanguage.value;
      const selectedCategory = filterCategory.value;
      // Filter data based on selected group (language) and category

      if (selectedGroup === "all" && selectedCategory === "all" ) {
        alert("Please select category to continue");
      //  filteredData = data;
      } else if (selectedGroup === "all" ) {
        filteredData = data.filter(
          (item) => item.category === selectedCategory
        );
      } else if (selectedCategory === "all") {
        filteredData = data.filter((item) => item.language === selectedGroup);
      } else {
       
          filteredData = data.filter(
            (item) =>
              item.language === selectedGroup &&
              item.category === selectedCategory
              
          );
      }

      filtereditemlist(filteredData);
    });

    filterLanguage.addEventListener("change", () => {
      const selectedGroup = filterLanguage.value;
      const selectedCategory = filterCategory.value;
      // Filter data based on selected group (language) and category
      if (selectedGroup === "all" && selectedCategory === "all") {
        alert("Please select any language to continue");
       // filteredData = data;
      } else if (selectedGroup === "all") {
        filteredData = data.filter(
          (item) => item.category === selectedCategory  
        );
      } else if (selectedCategory === "all") {
        filteredData = data.filter((item) => item.language === selectedGroup);
      } else {
        filteredData = data.filter(
          (item) =>
            item.language === selectedGroup &&
            item.category === selectedCategory
        );
      }

      filtereditemlist(filteredData);
    });
    HD.addEventListener("click", function () {
     // Get the checked state of the toggle button
      channelList.innerHTML="";
      const language=filterLanguage.value;
      const category=filterCategory.value;
      if (language === "all" && category === "all" &&isShowHD ) {
        //filteredData = data.filter( (item) =>item.group==="HD" );
      }
      else if(language === "all" && category === "all"){
        //filteredData=data;
      } 
      else if (language === "all" &&isShowHD ) {
        filteredData = data.filter(  (item) => item.category === category&&item.group==="HD" );
      } 
      else if (language === "all"  ) {
        filteredData = data.filter( (item) => item.category === category );
      }
      else if (category=== "all"&&isShowHD ) {
        filteredData = data.filter((item) => item.language === language &&item.group==="HD");
      }
      else if (category=== "all" ) {
       filteredData = data.filter((item) => item.language === language );
       
      }
       else {
        if(isShowHD)
        {
          filteredData = data.filter(
            (item) =>
              item.language === language &&
              item.category === category &&
              item.group ==="HD"   
          );
        }
        else{
          filteredData = data.filter(
            (item) =>
              item.language === language &&
              item.category === category &&
              item.group==="SD"  
          );
        }  
      }
      if (isShowHD) {
        HD.textContent = "SHOW SD";
      } else {
        HD.textContent = "SHOW HD";
      }
      isShowHD= !isShowHD; // Toggle state for next click
      filtereditemlist(filteredData); // Update the channel list based on filtering*/
    });
  });
// });
//}); 


function updateRemainingTime(channelID){
  const id1=channelID
  console.log("yes",id1);
 
 // updatetime(id1);

}

function getChannelDataById(channelId) {
   // Initialize variable to store current program
  var upcomingProgram = "";
  var upcomingPrograminfo = "";
  var programLimit = 1;
  var tagid=document.getElementById("nowplayingtag");
  var upcoming=document.getElementById("upcoming");
  var channelLogo=document.getElementById("channel-logo");
  //
  channelLogo.style.display="block";
  //
  const currentPlaying = document.getElementById("current-playing");
  const currentPlayinginfo = document.getElementById("current-playing-info");
 // const upcomingPlaying = document.getElementById("upcoming-playing"); // Add element for upcoming info (optional)
 // const upcomingPlayinginfo = document.getElementById("upcoming-playing-info"); // Add element for upcoming info (optional)
  var currentTime = getTimeshiftedCurrentTime(19800);
  currentPlaying.innerHTML = "";
  currentPlayinginfo.innerHTML = "";
  //upcomingPlaying.innerHTML = ""; // Clear upcoming info if displayed (optional)
  //upcomingPlayinginfo.innerHTML = ""; // Clear upcoming info if displayed (optional)
  //currentPlaying.textContent= "Now Playing "
 return fetch("./epgdata.json")
    .then((response) => response.json())
    .then((data) => {
      let foundCurrentProgram = false;
      for (var i = 0; i < data.length; i++) {
        var channel = data[i];
        const startTime = channel.start_time;
        const stopTime = channel.stop_time;
        const  title = channel.title;
        const description = channel.description;
        const channelName = channel.name;

        //now playing data
        if (startTime < currentTime && currentTime < stopTime) {
          // Store the title of the current program
          if (channelName === channelId) {
            currentPlayingProgram = title;
            currentPlayingPrograminfo = description;
           
            currentPlaying.textContent = currentPlayingProgram;
            currentPlayinginfo.textContent =currentPlayingPrograminfo;
        
            //console.log(currentPlayingPrograminfo);

            if(currentPlayingProgram.length === 0 &&tagid.style.display==="block")
              {
                channelInfo.style.display="none";
                upcoming.style.display="none";
              }
              else{
                tagid.style.display="block";
                upcoming.style.display="block";
              }
             foundCurrentProgram = true;
          }
          // Stop iterating after finding the current program
        } 
        /*else if (startTime > currentTime && programLimit > 0) {
        

          if (channelName === channelId) {
            upcomingProgram = title;

            upcomingPrograminfo = description;

            upcomingPlaying.textContent = upcomingProgram; // Display upcoming info if elements added (optional)

            upcomingPlayinginfo.textContent =
               upcomingPrograminfo; // Display upcoming info if elements added (optional)

            programLimit--;
          }
        }*/
        if (foundCurrentProgram) {
          break;
        }
      }
      return currentPlayingProgram;
    
    });
}



function getRemainingTime(starttime, stoptime) {
  // Split the time strings into hours and minutes
  const currentHour = parseInt(starttime.split(":")[0]);
  const currentMinute = parseInt(starttime.split(":")[1]);
  const stopHour = parseInt(stoptime.split(":")[0]);
  const stopMinute = parseInt(stoptime.split(":")[1]);
  // Convert everything to minutes for easier calculation
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const stopTotalMinutes = stopHour * 60 + stopMinute;
   // Calculate total time in seconds for both start and stop
   //const currentTotalSeconds = currentHour * 60 * 60 + currentMinute * 60;
  // const stopTotalSeconds = stopHour * 60 * 60 + stopMinute * 60;
  // Calculate the total difference in minutes (handling negative values)
  //let difference = stopTotalMinutes - currentTotalMinutes-parseInt(player.currentTime());
  let difference = stopTotalMinutes - currentTotalMinutes;
  if (difference < 0) {
    difference += 24 * 60; // Add a day if the stop time is before current time
  }
  // Convert the difference back to hours and minutes
  //const remainingHours = Math.floor(difference / 60);
  //const remainingMinutes = difference % 60;
  // Format the remaining time as hh:mm string
    // Calculate remaining hours, minutes, and seconds
    const remainingHours = Math.floor(difference / 3600);
    const remainingMinutes = Math.floor((difference % 3600) / 60);
    const remainingSeconds = difference % 60;
   // return `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  return `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}
function getjioChannelDataById(channelId) {
  var currentPlayingProgram = "";
  var currentPlayingPrograminfo = ""; // Initialize variable to store current program
//  var upcomingProgram = "";
//  var upcomingPrograminfo = "";
  var programLimit = 1;
  var tagid=document.getElementById("nowplayingtag");
  var upcoming=document.getElementById("upcoming");
  var channelLogo=document.getElementById("channel-logo");
  channelLogo.style.display="block";
  const currentPlaying = document.getElementById("current-playing");
  const currentPlayinginfo = document.getElementById("current-playing-info");
  currentPlaying.innerHTML = "";
  currentPlayinginfo.innerHTML = "";
 // const upcomingPlaying = document.getElementById("upcoming-playing"); // Add element for upcoming info (optional)
 // const upcomingPlayinginfo = document.getElementById("upcoming-playing-info"); // Add element for upcoming info (optional)
  var currentTime = jioepgtimeformat();
 
  //upcomingPlaying.innerHTML = ""; // Clear upcoming info if displayed (optional)
//  upcomingPlayinginfo.innerHTML = ""; // Clear upcoming info if displayed (optional)
  //currentPlaying.textContent= "Now Playing "
 
  fetch("./prod2.json")
    .then((response) => response.json())
    .then((data) => {

     
      var channel = data[channelId];
      const Programs = channel.find(item => item.start_time <= currentTime && currentTime < item.stop_time);
     // console.log(Programs.title);
     currentPlaying.innerHTML = Programs.title;
     currentPlayinginfo.innerHTML = Programs.description;
     tagid.style.display="block";
       /* const startTime = channel.start_time;
        const stopTime = channel.stop_time;
        const  title = channel.title;
        const description = channel.description;
       const jiochannelId = channel.id;
      // console.log(title);
        //now playing data
        if (startTime < currentTime && currentTime < stopTime) {
          
          
          // Store the title of the current program
            currentPlayingProgram = title;
            currentPlayingPrograminfo = description;
           // nowspan=title;
            currentPlaying.textContent = currentPlayingProgram;
            currentPlayinginfo.textContent =currentPlayingPrograminfo;
            
            starttime =convertTimeToHHMM(startTime.toString());
            stoptime =convertTimeToHHMM(stopTime.toString());
            currtime=convertTimeToHHMM(currentTime.toString());
           // rtdtime= getRemainingTime(currtime, stoptime)
            
          //  console.log("rtdtime",rtdtime)
          //  console.log("start",starttime)
          //  console.log("stop",stoptime)

      
            
   
            
            tagid.style.display="block";
         //   upcoming.style.display="block";
              
            // foundCurrentProgram = true;
          
          // Stop iterating after finding the current program
          
        } 
        /*else if (startTime > currentTime && programLimit > 0) {
          
        

          if (jiochannelId === channelId) {
            upcomingProgram = title;

            upcomingPrograminfo = description;

            upcomingPlaying.textContent = upcomingProgram; // Display upcoming info if elements added (optional)

            upcomingPlayinginfo.textContent =
               upcomingPrograminfo; // Display upcoming info if elements added (optional)

            programLimit--;
          }
        }*/
        
      
     // return currentPlayingProgram;
    });

 
}
function getEPGDataById(channelId) {
 
//  epgList.innerHTML="";
 // epgul.innerHTML="";
  channelLogo.style.display="block";
  var currentTime = jioepgtimeformat();
  var epgtime=document.getElementById("epg-time");
  epgtime.innerHTML="";
 fetch("./prod2.json")
    .then((response) => response.json())
    .then((data) => {
     // console.log(data[channelID])
        var channel = data[channelId];
      
       /* const previousProgram = channel.reduce((prev, current) => {
          if (current.stop_time < currentTime && current.stop_time > prev.stop_time) {
            return current;
          }
          return prev;
        }, channel[0]); // Assuming channel is not empty*/
        
        //console.log(previousProgram.title);
        const epgul=document.getElementById(channelId);
       const currentPrograms = channel.find(item => item.start_time <= currentTime && currentTime < item.stop_time);
       const curr=document.createElement("li");
       curr.id="timeshift";
       const prev=document.createElement("li");
       curr.textContent =currentPrograms.title;
      // console.log(currentPrograms.title);
      // prev.textContent=previousProgram.title;
      // epgList.appendChild(prev);
      // epgList.appendChild(curr);
       
       epgul.appendChild(curr);
       const totalWidth = 15000; // In pixels
       const totalDuration = 24 * 60 * 60 * 1000; // Total duration in milliseconds (24 hours)
       const startWidth = calculateItemWidth(currentPrograms.start_time.toString(), currentPrograms.stop_time.toString(), totalWidth, totalDuration);
       const itemWidth = calculateItemWidth(currentTime.toString(), currentPrograms.stop_time.toString(), totalWidth, totalDuration);
       if (itemWidth<312){
        curr.style.width =400+ 'px';
       }
       else{
        curr.style.width =itemWidth+ 'px';
        curr.style.marginRight =itemWidth/2+ 'px';
       }
       
        //curr.style.paddingRight = 312 + 'px';
       
       //curr.style.paddingRight = (startWidth-itemWidth) + 'px';
       // curr.style.paddingRight = (itemWidth) + 'px';
       const nowTime = document.createElement("li");
       nowTime.id="livetime";
       const nowtime=convertTimeToHHMM((currentPrograms.start_time).toString());
       nowTime.innerHTML=nowtime;
       const timeList = generateTimeList(currentTime.toString());
       timeList.forEach(item=>{
        const timeline=document.createElement("li");
        timeline.id="timeline";
        timeline.innerHTML=item;
       // epgtime.appendChild(nowTime);
        epgtime.appendChild(timeline);
       })
       const contentWidth = epgtime.scrollWidth;
       
    
       const futurePrograms= channel.filter(item => item.start_time > currentTime);
    //   console.log(futurePrograms);
      
       futurePrograms.forEach(item => {
        
        
     //  console.log(item.title);
         const future = document.createElement("li");
         const epgTime = document.createElement("li");
         const nowTime = document.createElement("li");
         epgTime.id="epgtime";
         future.id="timeshift";
         future.innerHTML="";

         future.textContent=item.title;
         const tttime=convertTimeToHHMM((item.start_time).toString());
         const totalWidth = 15000; // In pixels
         const totalDuration = 24 * 60 * 60 * 1000; // Total duration in milliseconds (24 hours)
         const itemWidth = calculateItemWidth(item.start_time.toString(), item.stop_time.toString(), totalWidth, totalDuration);
         
         //console.log(itemWidth);
      
          future.style.width =itemWidth+30+ 'px';
         
         //epgTime.innerHTML=tttime;
         //future.style.width = itemWidth + 'px';
         
         //epgTime.appendChild(nowTime);
        // epgtime.appendChild(epgTime);
        
        // epgList.appendChild(future);
         epgul.appendChild(future);

        // console.log(epgList);
         //console.log(vdf);
         
       });
     
    });
    
   // console.log(epgul);
    //epgList.appendChild(epgList);
    //return epgList;
 
}
function updatetime(channelId) {
 
 // console.log("hi");

  fetch("./prod1.json")
    .then((response) => response.json())
    .then((data) => {
      
      for (var i = 0; i < data.length; i++) {
        var channel = data[i];
        const startTime = channel.start_time;
        const stopTime = channel.stop_time;
       const jiochannelId = channel.id;
       var currentTime = jioepgtimeformat();
        if (startTime < currentTime && currentTime < stopTime) {
          if (jiochannelId=== channelId)
            { 
            starttime =convertTimeToHHMM(startTime.toString());
            stoptime =convertTimeToHHMM(stopTime.toString());
            currtime=convertTimeToHHMM(currentTime.toString());
            rtdtime= getRemainingTime(currtime, stoptime);
           // duration=getRemainingTime(starttime,stoptime);
            remainingTimeElement.textContent=rtdtime;
          }
        }
      }
    });
    //const updateInterval = setInterval(updatetime(channelID), 30000);
}

function convertTimeToHHMM(timeString) {

  // Extract year, month, day, hour, minute from the string
  const year = timeString.slice(0, 4);
  const month = timeString.slice(4, 6) - 1; // Months are 0-indexed
  const day = timeString.slice(6, 8);
  const hour = timeString.slice(8, 10);
  const minute = timeString.slice(10, 12);



  return `${hour}:${minute}`;
}

function jioepgtimeformat() {
  var now = new Date();
  var year = now.getFullYear().toString().padStart(4, "0");
  var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month (0-indexed)
  var day = now.getDate().toString().padStart(2, "0");
  var currentTime = now.getTime() / 1000;
  // Apply the time shift in seconds
  var adjustedTime = currentTime 
  // Convert adjusted time back to a Date object
  var adjustedDate = new Date(adjustedTime * 1000);
  // Extract and format time components from adjusted Date object
  var hour = adjustedDate.getHours().toString().padStart(2, "0");
  var minute = adjustedDate.getMinutes().toString().padStart(2, "0");
  var second = adjustedDate.getSeconds().toString().padStart(2, "0");
  var formattedTime = year + month + day + hour + minute + second;
  return formattedTime;
}

function getTimeshiftedCurrentTime(timeShiftSeconds) {
  // Check if timeShiftSeconds is a number (optional)

  if (typeof timeShiftSeconds !== "number") {
    console.warn("timeShiftSeconds is not a number. Using 0 seconds offset.");

    timeShiftSeconds = 0;
  }

  var now = new Date();

  var year = now.getFullYear().toString().padStart(4, "0");

  var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month (0-indexed)

  var day = now.getDate().toString().padStart(2, "0");

  // Get current time in seconds since epoch (Jan 1, 1970, 00:00:00 UTC)

  var currentTime = now.getTime() / 1000;

  // Apply the time shift in seconds

  var adjustedTime = currentTime - timeShiftSeconds;

  // Convert adjusted time back to a Date object

  var adjustedDate = new Date(adjustedTime * 1000);

  // Extract and format time components from adjusted Date object

  var hour = adjustedDate.getHours().toString().padStart(2, "0");

  var minute = adjustedDate.getMinutes().toString().padStart(2, "0");

  var second = adjustedDate.getSeconds().toString().padStart(2, "0");

  // Combine the formatted components into the desired format (remove seconds for now)

  var formattedTime = year + month + day + hour + minute + "00";

  

  return formattedTime;
}

//unwanted codes
const toggleButton = document.getElementById("toggle-list-size");

const nowinfo=document.getElementById("nowplaying-span")
let isListExpanded = true; // Initial state (list starts expanded)
toggleButton.addEventListener("click", function() {
  if (isListExpanded) {
    // Collapse the list
    channelid.classList.add("collapsed");
    toggleButton.textContent = "collapse List";
    console.log(currentPlayingProgram);
    nowinfo.textContent="hello";
   // nowinfo.textContent="block";
    nowinfo.style.display="block";
   // bd.style.background="#333333";
  } else {
    // Expand the list
    channelid.classList.remove("collapsed");
    toggleButton.textContent = "Expand List";
  }
  isListExpanded = !isListExpanded; // Toggle state for next click
});
// Update the current time display every second

//
/*const epgScroll = document.getElementById('channel-list-container');

let isDragging = false;
let startX, scrollLeft;

epgScroll.addEventListener('mousedown', (e) => {
  e.preventDefault();
  console.log("mousedown");
  isDragging = true;
  startX = e.clientX;
  scrollLeft = epgList.scrollLeft;
});

epgScroll.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  console.log("mousemove");
  epgList.scrollLeft = scrollLeft - (e.clientX - startX);
});

epgScroll.addEventListener('mouseup', () => {
 
  isDragging = false;
});*/


function generateTimeList(timestamp) {
  // Convert the timestamp to a Date object
  const startDate = new Date(timestamp.substring(0, 4), timestamp.substring(4, 6) - 1, timestamp.substring(6, 8), timestamp.substring(8, 10), timestamp.substring(10, 12));

  // Round down minutes to nearest 30
  startDate.setMinutes(Math.floor(startDate.getMinutes() / 30) * 30);

  // Create an array to store the time list
  const timeList = [];

  // Loop through 48 times (covering 24 hours in 30-minute intervals)
  for (let i = 0; i < 48; i++) {
    // Create a new Date object for each time slot
    const time = new Date(startDate);
    time.setMinutes(time.getMinutes() + i * 30);

    // Format the time as YYYYMMDDHHMM
  //  const formattedTime = `${time.getFullYear()}${('0' + (time.getMonth() + 1)).slice(-2)}${('0' + time.getDate()).slice(-2)}${('0' + time.getHours()).slice(-2)}${('0' + time.getMinutes()).slice(-2)}`;
  const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  
  timeList.push(formattedTime);
  }

  return timeList;
}
function calculateItemWidth(startTime, stopTime, totalWidth, totalDuration) {
  // Convert timestamps to Date objects
  const startDate = new Date(startTime.substring(0, 4), startTime.substring(4, 6) - 1, startTime.substring(6, 8), startTime.substring(8, 10), startTime.substring(10,  
 12));
  const stopDate = new Date(stopTime.substring(0, 4), stopTime.substring(4, 6) - 1, stopTime.substring(6, 8), stopTime.substring(8, 10), stopTime.substring(10, 12));

  // Calculate duration in milliseconds
  const durationMillis = stopDate - startDate;

  // Calculate item width
  const itemWidth = (totalWidth / totalDuration) * durationMillis;

  return itemWidth;
}


