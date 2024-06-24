function getResults() {
    // Array to hold all student results
    let results = [];

    // Assuming the data is in a table structure, you can adjust selectors based on actual structure
    let rows = document.querySelectorAll('table tbody tr');

    rows.forEach(row => {
        let columns = row.querySelectorAll('td');
        let examNumber = columns[0].innerText.trim();
        let points = parseInt(columns[1].innerText.trim(), 10);
        let division = columns[2].innerText.trim();

        // Assuming subjects are listed in subsequent columns
        let subjects = [];
        for (let i = 3; i < columns.length; i += 2) {
            let subject = columns[i].innerText.trim();
            let grade = columns[i + 1].innerText.trim();
            subjects.push({ subject, grade });
        }

        // Student result object
        let result = {
            examNumber,
            points,
            division,
            subjects
        };

        // Results array
        results.push(result);
    });

    return results;
}

console.log(getResults());
