// Carousel auto-switch
const images = document.querySelectorAll(".carousel-image");
let index = 0;

setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
}, 3500);

function includeHTML() {
    const elements = document.querySelectorAll("[include-html]");
    elements.forEach(async (el) => {
        const file = el.getAttribute("include-html");
        if (file) {
            const response = await fetch(file);
            const html = await response.text();
            el.innerHTML = html;
            el.removeAttribute("include-html");
            includeHTML(); // Recursive in case nested
        }
    });
}

includeHTML();

function openAffiliationModal() {
    document.getElementById("affiliationModal").style.display = "flex";
}

function closeAffiliationModal() {
    document.getElementById("affiliationModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((q) => {
        q.addEventListener("click", () => {
            q.classList.toggle("active");

            const answer = q.nextElementSibling;
            answer.style.display =
                answer.style.display === "block" ? "none" : "block";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active from all
            buttons.forEach((b) => b.classList.remove("active"));
            panes.forEach((p) => p.classList.remove("active"));

            // Add active to selected
            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modals = [
        {
            open: "#openModalBtnAicte",
            close: "#closeModalBtnAicte",
            modal: "#pdfModalAicte",
        },
        {
            open: "#openModalBtnState",
            close: "#closeModalBtnState",
            modal: "#pdfModalState",
        },
    ];

    modals.forEach(({ open, close, modal }) => {
        const openBtn = document.querySelector(open);
        const closeBtn = document.querySelector(close);
        const modalBox = document.querySelector(modal);

        if (openBtn && closeBtn && modalBox) {
            openBtn.addEventListener("click", () => {
                modalBox.style.display = "block";
            });
            closeBtn.addEventListener("click", () => {
                modalBox.style.display = "none";
            });
            window.addEventListener("click", (e) => {
                if (e.target === modalBox) {
                    modalBox.style.display = "none";
                }
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const years = ["2024-25", "2023-24", "2022-23"];
    const tbody = document.getElementById("placement-data");

    years.forEach((year) => {
        fetch(`utils/placements/${year}.json`)
            .then((res) => res.json())
            .then((data) => {
                const row = document.createElement("tr");
                row.innerHTML = `
            <td><strong>${data.year}</strong></td>
            <td>${data.EE.attended}</td>
            <td>${data.EE.selected}</td>
            <td>${data.ME.attended}</td>
            <td>${data.ME.selected}</td>
            <td>${data.CE.attended}</td>
            <td>${data.CE.selected}</td>
            <td>${data.ETCE.attended}</td>
            <td>${data.ETCE.selected}</td>
          `;
                tbody.appendChild(row);
            })
            .catch((err) => {
                console.error(`Error loading ${year}.json`, err);
            });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("utils/committee/gb.json")
        .then((res) => res.json())
        .then((members) => {
            const tbody = document.getElementById("gb-body");
            members.forEach((member, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
            <td>${index + 1}</td>
            <td>${member.name}</td>
            <td>${member.designation}</td>
          `;
                tbody.appendChild(row);
            });
        })
        .catch((err) => {
            console.error("Error loading governing body data:", err);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("message-container");
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type") || "director"; // default to director

    fetch("/utils/message.json")
        .then((res) => res.json())
        .then((data) => {
            const person = data[type];
            if (!person) {
                container.innerHTML = "<p>Invalid message type selected.</p>";
                return;
            }

            const section = document.createElement("section");
            section.className = "message-section";
            section.innerHTML = `
          <div class="message-box">
            <img src="${person.photo}" alt="${person.name}" class="message-photo" />
            <div class="message-text">
              <h2>${person.designation}'s Message</h2>
              <p class="person-name"><strong>${person.name}</strong></p>
              <p class="designation">${person.qualification}</p>
              <p class="message-block">${person.message}</p>
            </div>
          </div>
        `;
            container.appendChild(section);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pdfModal");
    const embed = document.getElementById("pdfEmbed");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".document-card").forEach((card) => {
        card.addEventListener("click", () => {
            const pdfSrc = card.getAttribute("data-pdf");
            embed.src = `${pdfSrc}#toolbar=0&navpanes=0&scrollbar=0`;
            modal.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        embed.src = "";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            embed.src = "";
        }
    });
});
