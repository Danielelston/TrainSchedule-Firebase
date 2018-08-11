var trainName = "";
var trainDestination = "";
var firstTime = 2;
var frequency = 0;

var config = {
    apiKey: "AIzaSyCbal5tMpOHQY6hlkBJdAC0hCUCpgvl8Oo",
    authDomain: "trainscheduleapp-de.firebaseapp.com",
    databaseURL: "https://trainscheduleapp-de.firebaseio.com",
    projectId: "trainscheduleapp-de",
    storageBucket: "trainscheduleapp-de.appspot.com",
    messagingSenderId: "952274948683"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").click(function (event) {

    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    trainDestination = $("#trainDestination-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        firstTime: firstTime,
        frequency: frequency,
    });
});

database.ref().on("child_added", function (childSnapshot) {

    tableRow = $("<tr>");
    
    tdTrainName = $("<td>");
    tdTrainDestination = $("<td>");
    tdFrequency = $("<td>");
    tdNextArrival = $("<td>");
    tdTimeAway = $("<td>");

    var firstTimeCon = moment((childSnapshot.val().firstTime), "HH:mm").subtract(1, "years")

    var timeDiff = moment().diff(firstTimeCon, "minutes");

    tdTrainName.text(childSnapshot.val().trainName);
    tdTrainDestination.text(childSnapshot.val().trainDestination);
    tdFrequency.text(childSnapshot.val().frequency);

    console.log("train name is " + trainName);
    // console.log("the current time " + timeObj.objCurrentTime);
    console.log("the first time is " + childSnapshot.val().firstTime);
    // console.log("the train mod time " + timeObj.objFirstTimeConvert);
    console.log("the time diff in min is " + timeDiff);

    


    tableRow.append(tdTrainName);
    tableRow.append(tdTrainDestination);
    tableRow.append(tdFrequency);
    tableRow.append(tdNextArrival);
    tableRow.append(tdTimeAway);

    $("#trainData").append(tableRow);
    
});
