// Load saved courses from LocalStorage
const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];

savedCourses.forEach(course => {
    addCourseToTable(course.name, course.unit, course.score, course.grade, course.point);
});

// Get elements
const form = document.getElementById("courseForm");
const tableBody = document.querySelector("#courseTable tbody");
const result = document.getElementById("result");

// Convert score to Nigerian grade
function getGrade(score) {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
}

// Convert grade to grade point
function getGradePoint(grade) {
    const points = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
    return points[grade];
}

// Add course
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("courseName").value;
    const unit = parseInt(document.getElementById("courseUnit").value);
    const score = parseInt(document.getElementById("courseScore").value);

    const grade = getGrade(score);
    const point = getGradePoint(grade);

   // Create new row with delete button
const row = document.createElement("tr");
row.innerHTML = `
    <td data-label="Course">${name}</td>
    <td data-label="Unit">${unit}</td>
    <td data-label="Score">${score}</td>
    <td data-label="Grade">${grade}</td>
    <td data-label="Grade Point">${point}</td>
    <td data-label="Action"><button class="deleteBtn">Delete</button></td>
`;



    tableBody.appendChild(row);

    // Reset form
    form.reset();
});



// Calculate CGPA
document.getElementById("calculateBtn").addEventListener("click", function () {
    let totalUnits = 0;
    let totalPoints = 0;

    const rows = document.querySelectorAll("#courseTable tbody tr");

    rows.forEach(row => {
        const unit = parseInt(row.children[1].textContent);
        const point = parseInt(row.children[4].textContent);

        totalUnits += unit;
        totalPoints += unit * point;
    });

    if (totalUnits === 0) {
        result.textContent = "Please add at least one course!";
        return;
    }

    const cgpa = (totalPoints / totalUnits).toFixed(2);
    result.textContent = `Your CGPA is: ${cgpa}`;
});
// Delete course functionality
tableBody.addEventListener("click", function(e) {
    if(e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.parentElement.remove();
        result.textContent = ""; // Clear CGPA after deletion
    }
});
