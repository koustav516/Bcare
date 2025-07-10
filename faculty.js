document.addEventListener("DOMContentLoaded", () => {
    const departments = {
        etce: "Electronics and Telecommunication Engineering",
        mech: "Mechanical Engineering",
        civil: "Civil Engineering",
        electrical: "Electrical Engineering",
    };

    const container = document.getElementById("faculty-container");
    container.innerHTML = "";

    fetch("./utils/faculty/faculty.json")
        .then((res) => res.json())
        .then((data) => {
            if (data.length === 0) return;

            const container = document.getElementById("faculty-container"); // Make sure your HTML has this ID

            const section = document.createElement("div");
            section.innerHTML = `<h3 style="margin-top: 40px;">Faculty Members</h3>`;

            const table = document.createElement("table");
            table.className = "committee-table";
            table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Date Of Joining</th>
                </tr>
            </thead>
            <tbody>
                ${data
                    .map(
                        (faculty) => `
                    <tr>
                        <td>${faculty.name}</td>
                        <td>${faculty.designation}</td>
                        <td>${faculty.department}</td>
                        <td>${faculty.date_of_joining}</td>
                    </tr>
                `
                    )
                    .join("")}
            </tbody>
        `;

            section.appendChild(table);
            container.appendChild(section);
        })
        .catch((err) => {
            console.error("Failed to fetch faculty data:", err);
        });
});
