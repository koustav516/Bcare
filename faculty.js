document.addEventListener('DOMContentLoaded', () => {
  const departments = {
    etce: 'Electronics and Telecommunication Engineering',
    mech: 'Mechanical Engineering',
    civil: 'Civil Engineering',
    electrical: 'Electrical Engineering'
  };

  const container = document.getElementById('faculty-container');
  container.innerHTML = '';

  Object.entries(departments).forEach(([key, deptName]) => {
    fetch(`./utils/faculty/${key}.json`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) return;

        const section = document.createElement('div');
        section.innerHTML = `<h3 style="margin-top: 40px;">${deptName}</h3>`;
        
        const table = document.createElement('table');
        table.className = 'committee-table';
        table.innerHTML = `
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Experience</th>
              <th>Qualification</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(faculty => `
              <tr>
                <td>${faculty.name}</td>
                <td>${faculty.designation}</td>
                <td>${faculty.experience}</td>
                <td>${faculty.qualification}</td>
              </tr>
            `).join('')}
          </tbody>
        `;

        section.appendChild(table);
        container.appendChild(section);
      })
      .catch(err => {
        console.error(err);
      });
  });
});
