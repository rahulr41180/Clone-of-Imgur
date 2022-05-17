
var array = JSON.parse(localStorage.getItem("imgurExploreData"));

window.onscroll = function() {myFunction()};

var navbar = document.querySelector(".Grid__Container-Heading-Box");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

let timerId;
const debounce = (func,delay) => {
    if(timerId) {
        clearInterval(timerId);
    }
    console.log('timerId:', timerId)

    timerId = setTimeout(function() {
        func();
    },delay)
}

const main = async () => {
    console.log("Hello main");

    let data = await SearchItem();

    if(data === undefined) {
        return false;
    }

    console.log("data come from main:", data);
    var VideoSearchData = JSON.parse(localStorage.getItem("ImgurVideoSearchData"));
    DropDown(data,VideoSearchData);
}
const SearchItem = async () => {

    try {

        let SearchTerm = document.querySelector("#ImageVideoSearch").value;
        if(SearchTerm === "") {
            window.location.href = "index.html";
            return;
        }

        let ApiUrl = `https://pixabay.com/api/?key=27365318-f077b063a3824294fcdda6437&q=${SearchTerm}&image_type=all&order=popular&pretty=true&per_page=50`;
        let VideoUrl = `https://pixabay.com/api/videos/?key=27365318-f077b063a3824294fcdda6437&q=${SearchTerm}&video_type=all&order=popular&pretty=true&per_page=50`;
        let res = await fetch(ApiUrl);

        let Videores = await fetch(VideoUrl);

        let data = await res.json();
        let Videodata = await Videores.json();

        console.log('Videodata:', Videodata)
        console.log('data:', data.hits)
        localStorage.setItem("ImgurVideoSearchData", JSON.stringify(Videodata.hits));

        return data.hits;
    }
    catch(error) {
        console.log('error:', error)
    }
}

const ShowData = () => {

    document.querySelector("h2").innerHTML = "Hello"

}
const uploadFn = () => {
    window.location.href = "/upload.html"
}
var Explore = false;
const ExploreGrid = () => {
    if(Explore === false) {
        
        let Grid = document.querySelector(".Explore__Tag-Box-Grid");
        Grid.style.height = "21vw"
        let Tags = document.querySelector(".Tags");
        Tags.innerHTML = "LESS TAGS ❎";
        Explore = true;
    }
    else {
        let Grid = document.querySelector(".Explore__Tag-Box-Grid");
        Grid.style.height = "10vw"
        let Tags = document.querySelector(".Tags");
        Tags.innerHTML = "MORE TAGS ➕";
        Explore = false;
    }
}
document.querySelector(".Tags").addEventListener("click",ExploreGrid);

const AllDataFetch = async() => {
    try {
        let url = "https://pixabay.com/api/?key=27365318-f077b063a3824294fcdda6437&order=popular&per_page=40&image_type=all&pretty=true";
        let videoUrl = "https://pixabay.com/api/videos/?key=27365318-f077b063a3824294fcdda6437&video_type=all&pretty=true&order=popular&per_page=5";

        let res = await fetch(url);
        let videoRes = await fetch(videoUrl);


        let data = await res.json()        
        let videoData = await videoRes.json()

        // localStorage.setItem("imgurvideodata",JSON.stringify([]));
        localStorage.setItem("imgurvideodata",JSON.stringify(videoData.hits));
        
        var video__data = JSON.parse(localStorage.getItem("imgurvideodata"));
        
        console.log('videoData:', videoData)
        console.log('videoData:', videoData.hits)
        console.log('data:', data)
        console.log("data : ", data.hits);

        GridContainer(data.hits.concat(video__data));
    }
    catch(error) {
        console.log("error :", error);
    }
}
AllDataFetch();

const DropDown = (ImageData,VideoData) => {
    console.log('VideoData:', VideoData)
    console.log('ImageData:', ImageData)

    document.querySelector(".SearchItem__Show-Box").style.backgroundColor = "rgb(46,48,53)";
    document.querySelector(".SearchItem__Show-Box").style.height = "35vw"
    document.querySelector(".ImageBox").innerHTML = "";
    document.querySelector(".VideoBox").innerHTML = "";
    document.querySelector(".ImageBox").style.height = "32.8vw"
    document.querySelector(".VideoBox").style.height = "32.8vw"
    var Heading = document.createElement("p");
    Heading.setAttribute("class","HeadingBox");
    Heading.innerHTML = "IMAGE";
    document.querySelector(".ImageBox").append(Heading);
    ImageData.map((element,index) => {
        var ImageItem = document.createElement("div");
        ImageItem.setAttribute("class","ImageItem");
        ImageItem.innerHTML = `<b>${index+1}</b> : ${element.tags}`
        
        document.querySelector(".ImageBox").append(ImageItem);
    })
    var HeadingVideo = document.createElement("p");
    HeadingVideo.setAttribute("class","HeadingBox");
    HeadingVideo.innerHTML = "Video";
    document.querySelector(".VideoBox").append(HeadingVideo);
    VideoData.map((element,index) => {
        let ImageItem = document.createElement("div");
        ImageItem.setAttribute("class","ImageItem");
        ImageItem.innerHTML = `<b>${index+1}</b> : ${element.tags}`
        
        document.querySelector(".VideoBox").append(ImageItem);
    })
}

// DropDown("Hello","Video");
const InsideExplore = () => {
    document.querySelector(".Explore__Tag-Box-Grid").innerHTML = "";
    array.map((element) => {
        var ExploreGrid = document.createElement("div");
        ExploreGrid.setAttribute("class", "ExploreGrid")
        ExploreGrid.style.gridArea = element.x;
        var Explore__Image = document.createElement("div");
        Explore__Image.setAttribute("class","Explore__Image");
        var Image = document.createElement("img");
        Image.setAttribute("class","Explore__Image-Image")
        Image.setAttribute("src",element.image)
        var Explore__Content = document.createElement("div");
        Explore__Content.setAttribute("class","Explore__Content");
        Explore__Content.style.backgroundColor = element.color;
        var type = document.createElement("p");
        type.innerHTML = element.type;
        var posts = document.createElement("p");
        posts.innerHTML = `${element.posts}, Posts`;

        document.querySelector(".Explore__Tag-Box-Grid").append(ExploreGrid);
        ExploreGrid.append(Explore__Image,Explore__Content);
        Explore__Image.append(Image);
        Explore__Content.append(type,posts);
    })
}
InsideExplore()





const GridContainer = (Data) => {
    console.log('Data:', Data)
    document.querySelector(".Grid__Container-Content-Box").innerHTML = "";
    // Array(16).fill(-1).map((element) => {
    Data.map((element) => {
        var Grid__Box = document.createElement("div");
        Grid__Box.setAttribute("class","Grid__Box");

        if(element.type !== "film" && element.type !== "animation") {
            var Grid__ImageBox = document.createElement("div");
            Grid__ImageBox.setAttribute("class","Grid__ImageBox");
            Grid__ImageBox.style.backgroundImage = `url(${element.webformatURL})`
            var Grid__ImageBoxContent = document.createElement("p");
            Grid__ImageBoxContent.setAttribute("class","Grid__ImageBoxContent");
            Grid__ImageBoxContent.innerHTML = `${element.type === "film" ? "Video" : "Image"}`
        }
        else {
            var Grid__VideoBox = document.createElement("div");
            Grid__VideoBox.setAttribute("class","Grid__VideoBox");
            var Grid__Video = document.createElement("video");
            
            Grid__Video.controls = true;

            Grid__Video.setAttribute("class","Grid__Video");
            var Grid__VideoSource = document.createElement("source");
            Grid__VideoSource.src = element.videos.large.url;
            Grid__VideoSource.type = "video/mp4";
            var Grid__Source = document.createElement("source");
            Grid__Source.src = "movie.ogg"
            Grid__Source.type = "video/ogg"
        }


        var Grid__ContentBox = document.createElement("div");
        Grid__ContentBox.setAttribute("class","Grid__ContentBox");
        var Title__Box = document.createElement("div");
        Title__Box.setAttribute("class","Title__Box");
        Title__Box.innerHTML = element.tags;

        var LikeComment__Box = document.createElement("div");
        LikeComment__Box.setAttribute("class","LikeComment__Box");

        var Like__Box = document.createElement("p");
        Like__Box.setAttribute("class","Like__Box");
        var Like = element.likes;
        var UpperArrow = document.createElement("i");
        UpperArrow.setAttribute("class","material-icons UpperArrow");
        // UpperArrow.setAttribute("class","UpperArrow");
        UpperArrow.innerHTML = "&#xe5d8;"
        var DownArrow = document.createElement("i");
        DownArrow.setAttribute("class","material-icons DownArrow");
        DownArrow.innerHTML = "&#xe5db;"

        var Comment__Box = document.createElement("p");
        Comment__Box.setAttribute("class","Comment__Box");
        var Comment = element.comments;
        var CommentIcon = document.createElement("i");
        CommentIcon.setAttribute("class","material-icons CommentIcon")
        CommentIcon.innerHTML = "&#xe0ca;"

        var View__Box = document.createElement("p");
        View__Box.setAttribute("class","View__Box");
        var View = element.views;
        var ViewIcon = document.createElement("i");
        ViewIcon.setAttribute("class","material-icons ViewIcon")
        ViewIcon.innerHTML = "&#xe8f4;"

        document.querySelector(".Grid__Container-Content-Box").append(Grid__Box);

        if(element.type !== "film" && element.type !== "animation") {
            Grid__Box.append(Grid__ImageBox,Grid__ContentBox);
            Grid__ImageBox.append(Grid__ImageBoxContent);
        }
        else {
            Grid__Box.append(Grid__VideoBox,Grid__ContentBox);
            Grid__VideoBox.append(Grid__Video,"Vidoe");
            Grid__Video.append(Grid__VideoSource,Grid__Source)
        }
        Grid__ContentBox.append(Title__Box,LikeComment__Box);
        LikeComment__Box.append(Like__Box,Comment__Box,View__Box)
        Like__Box.append(UpperArrow,Like,DownArrow);
        Comment__Box.append(CommentIcon,Comment)
        View__Box.append(ViewIcon,View);  
    })
}



// GridContainer();