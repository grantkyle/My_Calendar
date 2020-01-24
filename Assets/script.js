// Work hours in military time
var nineToFive = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// This uses moment to display the time: currentHour will come in handy later down when we use it to differentiate 
// before, after or current hour by color
function displaySchedule() {
    var currentHour = moment().hour()
    for (let index = 0; index < nineToFive.length; index++) {



        // Row creation
        var row = $("<div class='row'>")

        // Column One - work hours displayed to the left text input box
        var columnOne = $("<div class='col-sm-2'>")

        // Specifying the numbers will be read as times
        columnOne.attr("alignment", "text-align:center")

        // Specifying that anything before noon will be read as AM
        columnOne.text(nineToFive[index] + ":00am")

        // Specifying that noon and above will be read as PM. All of the times will read as AM unless the code below specifies
        // that above a certain time (12 or above) will be read as PM
        if (nineToFive[index] >= 12) {
            columnOne.text(nineToFive[index] + ":00pm")
            var standardHour = nineToFive[index] - 12
            if (nineToFive[index] >= 13)
                columnOne.text(standardHour + ":00 pm")
        }

        // Column Two - Background colors in bootstrap have peculiar names!. The below code is used
        // to display the text area
        var columnTwo = $("<div class='col-sm-8'>")
        var textArea = $("<textarea class='bg-primary form-control'>")

        // This explains if the current hour is less than the work hours to display the color blue
        if (currentHour < nineToFive[index]) {
            textArea = $("<textArea class='bg-warning form-control'>")
        }

        else if (currentHour > nineToFive[index]) {
            textArea = $("<textArea class='bg-danger form-control'>")
            // This explains if current hour is greater than work hours to change to color green-blue (or whatever it is, I'm color blind)
        }

        textArea.attr("id", "textArea" + index)
        // This is used to grab text that was entered and enter it into local storage
        var textToSave = localStorage.getItem("textArea" + index)

        // Putting text in box
        textArea.text(textToSave)

        // Turning the column into a text box
        columnTwo.append(textArea)

        // Creation of the third column
        var columnThree = $("<div class= 'col-sm-2'>")
        // Creation of the button
        var button = $("<button class='btn-primary'>")
        button.attr("class", "saveButton")
        button.text("Save!")

        // Appending the three columns to the front end
        columnThree.append(button)
        row.append(columnOne, columnTwo, columnThree)

        // This is the div class where the planner is actually dynamically displayed through the codes written above
        $(".showAll").append(row)
    }
}

displaySchedule()

// This makes the save button save upon click
$(".saveButton").on("click", function () {
    for (let index = 0; index < nineToFive.length; index++) {
        var textToSave = $("#textArea" + index).val()
        localStorage.setItem("textarea" + index, textToSave)
    }
})
