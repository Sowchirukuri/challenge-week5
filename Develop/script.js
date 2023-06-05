// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  var currentDate = dayjs().format("dddd, MMMM Do");
  $("#currentDay").text(currentDate);

  // Generate time blocks for each hour from 9am to 5pm
  for (var i = 9; i <= 17; i++) {
    var hour = dayjs().hour(i);
    var timeBlock = $("<div>").addClass("row time-block");
    var timeColumn = $("<div>").addClass("time-column").text(hour.format("hA"));
    var eventColumn = $("<div>").addClass("event-column");
    var eventInput = $("<input>").attr("id", "event-" + i).attr("type", "text").val(getEventFromLocalStorage(i));
    eventColumn.append(eventInput);
    var saveColumn = $("<div>").addClass("save-column");
    var saveButton = $("<button>").addClass("save-button").attr("data-hour", i).text("Save");
    saveColumn.append(saveButton);
    timeBlock.append(timeColumn, eventColumn, saveColumn);

    // Color-code time blocks based on past, present, or future
    if (hour.isBefore(dayjs(), "hour")) {
      timeBlock.addClass("past");
    } else if (hour.isSame(dayjs(), "hour")) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }

    $(".container").append(timeBlock);
  }

  // Save button click handler
  $(".save-button").click(function() {
    var hour = $(this).data("hour");
    var eventText = $("#event-" + hour).val();

    // Save event to local storage
    localStorage.setItem(hour, eventText);
  });

  // Function to retrieve event from local storage
  function getEventFromLocalStorage(hour) {
    var eventText = localStorage.getItem(hour);
    return eventText ? eventText : "";
  }
});
