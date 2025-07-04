document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file") || "icc.json" || "anti-ragging.json" || "grievance.json" || "iic.json" || "iqac.json" || "scst.json";  // fallback

  fetch(`./utils/committee/${file}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#committee-table tbody");
      const title = document.querySelector("#committee-title");

      // Optional: Show which committee
      const committeeType = data.length > 0 ? data[0].committee_type : "Committee";
      title.textContent = `${committeeType} Members`;

      data.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.committee_type}</td>
          <td>${member.order_reference}</td>
          <td>${member.appointment_date}</td>
          <td>${member.member_name}</td>
          <td>${member.designation}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error loading data:", err);
      document.querySelector("#committee-title").textContent = "Error loading committee data.";
    });
});
