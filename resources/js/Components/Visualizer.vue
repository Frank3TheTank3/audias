<script setup>
/********************************************/
/***********VISUAL PROCESSING UNIT***********/
/********************************************/

/*

This visual processing unit takes the uploaded audio and processes it to then be displayed
as a wave or block type visualisation. Furthermore there is a CSS Visualizer that has been added.

*/
console.log("Visualizer initialized");
//Imports
import { useGameStore } from "../../store/gamestore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

let { gameHasStarted, levelDistance, movingHeight } = storeToRefs(useGameStore());

let audioAnalyser;
let audioElement;
let foundBPM;
let output;
let canvasSection;
let herzRate;
let canvasBlock;
let ctxBlock;
let canvasVis;
let ctxVis;

onMounted(() => {
    canvasVis= document.getElementById("viscanvas");
    ctxVis  = canvasVis.getContext("2d");
    canvasBlock = document.getElementById("blockcanvas");
    ctxBlock = canvasBlock.getContext("2d");
    console.log("Mounting initialized");
    function byId(e) {
        return document.getElementById(e);
    }

    //Get audioupload element and check on change
    document
        .getElementById("audioupload")
        .addEventListener("change", onChosenFileChange, false);

    //Get newly created audio element
    audioElement = document.querySelector("audio");
    herzRate = document.getElementById("herz");
    //Get audioplayer
    var audioPlayer = byId("sound");

    //Display BPM
    output = byId("output");
    //output.innerHTML = foundBPM;

    //Get duration span & show duration after
    var span = byId("duration");
    getDuration(audioPlayer.src, span);

    canvasSection = document.querySelector('section');

    //On finished mount then give console message
    console.log("Visualizer mounted");
});

////////////////////////////////////////
//////*Select Audio Function*///////////
///////////////////////////////////////

//Get Element by ID Fuction

function byId(e) {
    return document.getElementById(e);
}
//Load File and Read Object
function loadFileObject(fileObj, loadedCallback) {
    var reader = new FileReader();
    reader.onload = loadedCallback;
    reader.readAsDataURL(fileObj);
}
//On chonsen file Function
function onChosenFileChange(evt) {
    var fileType = this.files[0].type;
    if (fileType.indexOf("audio") != -1) {
        loadFileObject(this.files[0], onSoundLoaded);
        setBPM(this.files[0]);
    }
}

//////////////////////////////////////////
//////*Set Audio BPM Guess Function*//////
//////////////////////////////////////////
// http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/

function setBPM(file) {
    var reader = new FileReader();
    var context = new (window.AudioContext || window.webkitAudioContext)();
    reader.onload = function () {
        context.decodeAudioData(reader.result, function (buffer) {
            prepare(buffer);
        });
    };
    reader.readAsArrayBuffer(file);
}

function prepare(buffer) {
    var offlineContext = new OfflineAudioContext(
        1,
        buffer.length,
        buffer.sampleRate
    );
    var source = offlineContext.createBufferSource();
    source.buffer = buffer;
    var filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.startRendering();
    offlineContext.oncomplete = function (e) {
        process(e);
    };
}

function process(e) {
    var filteredBuffer = e.renderedBuffer;
    //If you want to analyze both channels, use the other channel later
    var data = filteredBuffer.getChannelData(0);
    var max = arrayMax(data);
    var min = arrayMin(data);
    var threshold = min + (max - min) * 0.98;
    var peaks = getPeaksAtThreshold(data, threshold);
    var intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
    var tempoCounts = groupNeighborsByTempo(intervalCounts);
    tempoCounts.sort(function (a, b) {
        return b.count - a.count;
    });
    if (tempoCounts.length) {
        foundBPM = tempoCounts[0].tempo;
        console.log("BPM: " + foundBPM);
        output.innerHTML = foundBPM;

    }
}

function getPeaksAtThreshold(data, threshold) {
    var peaksArray = [];
    var length = data.length;
    for (var i = 0; i < length; ) {
        if (data[i] > threshold) {
            peaksArray.push(i);
            // Skip forward ~ 1/4s to get past this peak.
            i += 10000;
        }
        i++;
    }
    return peaksArray;
}

function countIntervalsBetweenNearbyPeaks(peaks) {
    var intervalCounts = [];
    peaks.forEach(function (peak, index) {
        for (var i = 0; i < 10; i++) {
            var interval = peaks[index + i] - peak;
            var foundInterval = intervalCounts.some(function (intervalCount) {
                if (intervalCount.interval === interval)
                    return intervalCount.count++;
            });
            //Additional checks to avoid infinite loops in later processing
            if (!isNaN(interval) && interval !== 0 && !foundInterval) {
                intervalCounts.push({
                    interval: interval,
                    count: 1,
                });
            }
        }
    });
    return intervalCounts;
}

function groupNeighborsByTempo(intervalCounts) {
    var tempoCounts = [];
    intervalCounts.forEach(function (intervalCount) {
        //Convert an interval to tempo
        var theoreticalTempo = 60 / (intervalCount.interval / 44100);
        theoreticalTempo = Math.round(theoreticalTempo);
        if (theoreticalTempo === 0) {
            return;
        }
        // Adjust the tempo to fit within the 90-180 BPM range
        while (theoreticalTempo < 90) theoreticalTempo *= 2;
        while (theoreticalTempo > 180) theoreticalTempo /= 2;

        var foundTempo = tempoCounts.some(function (tempoCount) {
            if (tempoCount.tempo === theoreticalTempo)
                return (tempoCount.count += intervalCount.count);
        });
        if (!foundTempo) {
            tempoCounts.push({
                tempo: theoreticalTempo,
                count: intervalCount.count,
            });
        }
    });
    return tempoCounts;
}

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
function arrayMin(arr) {
    var len = arr.length,
        min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
}

function arrayMax(arr) {
    var len = arr.length,
        max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
}

function getDuration(src, destination) {
    //const audioEl = document.querySelector('audio');
    audioElement.onloadedmetadata = (event) => {
        destination.textContent = secondsToTime(audioElement.duration);
        console.log("Audio duration:" + audioElement.duration);
        levelDistance.value = audioElement.duration;
        console.log(levelDistance.value);
    };
    audioElement.src = src;
}

function secondsToTime(secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = hours + "h " + minutes + "m " + seconds + "s";
    return obj;
}
////////////////////////////////////////
//////*Load & Play Audio Function*//////
///////////////////////////////////////

//On sound loaded - set audio source - display controlls - play audio
function onSoundLoaded(evt) {
    var audioPlayer = byId("sound");
    console.log(audioPlayer);
    audioPlayer.src = evt.target.result;
    audioPlayer.controls = true;
    audioPlayer.play();
    canvasBlock.height = 250;
    canvasBlock.width = 1000;
    canvasVis.height = 250;
    canvasVis.width = 1000;

    gameHasStarted.value = true;
    console.log("Store set to true");
    //Get Audio Context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Get the source
    const audio = document.querySelector("audio");
    audio.onplay = () => audioCtx.resume();
    const source = audioCtx.createMediaElementSource(audio);

    // Create analysers
    const analyser = audioCtx.createAnalyser();
    audioAnalyser = analyser;
    const blockanalyser = audioCtx.createAnalyser();
    analyser.fftSize = 2 ** 8;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Connect parts
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    source.connect(blockanalyser);
    blockanalyser.connect(audioCtx.destination);
    herzRate.innerHTML = audioCtx.sampleRate;
    //Print sample rate to page

    //Call visualisation functions
    getAudioWave(analyser);
    getBlocks(blockanalyser);

    //Colorful CSS Visualisation
    const v = new Array(bufferLength)
        .fill()
        .map(
            (e) =>
                (e = document.createElement("i")) && canvasSection.appendChild(e) && e
        );

    setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        dataArray.forEach((d, i) =>
            v[i].style.setProperty("--c", (Math.abs(128 - d) * 2.8125) | 0)
        );
    }, 15);
}

/////////////////////////////////////
//////*Get Audio Wave Function*//////
/////////////////////////////////////

async function getAudioWave(analyserNode) {
    //Get Wave Canvas

    //Set Wave Canvas Height & Width
    var WIDTH = 1000;
    var HEIGHT = 250;

    //Set fft size for analyer
    analyserNode.fftSize = 2048;

    //Set Bufferlength
    let bufferLength = analyserNode.fftSize;

    //Create timeData Array from Bufferlength
    var timeData = new Uint8Array(bufferLength);

    //Print important info to console
    console.log(bufferLength);
    console.log(timeData);

    //Get inital Byte Time Domain Data - evtl obselete
    analyserNode.getByteTimeDomainData(timeData);

    //Not in use
    function handleError(err) {
        console.log("You must upload audio in order to proceed");
    }

    /////////////////////////////////////
    //////*Draw Audio Wave Function*//////
    /////////////////////////////////////

    //Draw Wave form from Data function
    function drawTimeData(timeData) {
        //Animation frame loop
        window.requestAnimationFrame(() => drawTimeData(timeData));

        //Get time data information
        analyserNode.getByteTimeDomainData(timeData);



        //Clear canvas - set WAVE width & stroke style
        ctxVis.clearRect(0, 0, canvasVis.width, canvasVis.height);
        ctxVis.lineWidth = 10;
        ctxVis.strokeStyle = "#ffc600";
        const sliceWidth = WIDTH / bufferLength;
        let x = 0;

        //Beginn Drawing Wave
        ctxVis.beginPath();
        for (var i = 0; i < bufferLength; i++) {
            const v = timeData[i] / 128.0;
            const y = (v * HEIGHT) / 2;

            if (i === 0) ctxVis.moveTo(x, y);
            else ctxVis.lineTo(x, y);

            x += sliceWidth;
        }
        ctxVis.lineTo(WIDTH, HEIGHT / 2);
        ctxVis.stroke();
    }

    //Call draw wave form function
    drawTimeData(timeData);
}

///////////////////////////////////////
//////*Get Audio Blocks Function*//////
///////////////////////////////////////

//Draw Blocks function
async function getBlocks(analyserBlocksNode) {
    //Get block canvas


    //Set block size
    analyserBlocksNode.fftSize = 256;

    //Set Bufferlength
    var bufferLength = analyserBlocksNode.frequencyBinCount;

    //Create timeData Array from Bufferlength
    var timeData = new Uint8Array(bufferLength);

    //Set canvas width / height
    var WIDTH = 1000;
    var HEIGHT = 250;

    //Set block width / height
    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    //Clear block canvas
    ctxBlock.clearRect(0, 0, WIDTH, HEIGHT);

    ///////////////////////////////////////
    //////*Draw Blocks Function*///////////
    ///////////////////////////////////////

    function drawBlocks(timeData) {
        //Animation frame loop
        window.requestAnimationFrame(() => drawBlocks(timeData));

        //Get time data information
        analyserBlocksNode.getByteTimeDomainData(timeData);

        //Clear canvas - set BAR width & stroke style
        ctxBlock.clearRect(0, 0, WIDTH, HEIGHT);
        ctxBlock.lineWidth = 2;
        ctxBlock.strokeStyle = "#ffc600";
        const barWidth = WIDTH / bufferLength;

        let x = 0;

        //Beginn Drawing Blocks
        for (var i = 0; i < bufferLength; i++) {


            barHeight = timeData[i];

            ctxBlock.fillStyle = "rgb(" + (barHeight + 10) + ",50,50)";
            ctxBlock.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

            movingHeight.value = barHeight;
            //console.log(movingHeight.value)
            //console.log(barHeight);
            x += barWidth + 1;

        }
    }

    drawBlocks(timeData);
}
</script>

<style scoped>
  .center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

section {
    display: flex;
    align-items: center;
}

section i {
    flex: 1 1 100%;
    height: calc(100vh * var(--c)/360);
    border-radius: 55%;
    background: hsl(var(--c), 95%, 45%);
}

</style>

<template>

<div class="flex-col items-center text-center">
    <audio class="center" id="sound"></audio>
            <label for="avatar">Upload (.wav / .mp3):</label>
            <input
                class="btn btn-primary"
                type="file"
                id="audioupload"
                name="audioupload"
                accept="audio/mp3,audio/*; capture=microphone"
            />
            <p>Duration: <span id="duration"></span></p>
            <p>BPM: <span id="output"></span></p>
            <p >Herz:  <span id="herz"></span></p>

            <canvas class="center" id="blockcanvas" height="0"></canvas>
            <canvas class="center" id="viscanvas" height="0"></canvas>

</div>
 <section></section>
</template>
