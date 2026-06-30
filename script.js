// =========================================
// AI Resume Builder Pro
// script.js
// =========================================

// ==============================
// Buttons
// ==============================

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// ==============================
// Resume Output
// ==============================

const resumeOutput = document.getElementById("resumeOutput");

// ==============================
// Store Resume Data
// ==============================

let currentResumeHTML = "";

// ==============================
// Generate Resume
// ==============================

generateBtn.addEventListener("click", function () {

    // ----------------------------
    // Get Form Values
    // ----------------------------

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const education = document.getElementById("education").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const projects = document.getElementById("projects").value.trim();
    const languages = document.getElementById("languages").value.trim();

    const profileImage = document.getElementById("profileImage").files[0];

    // ----------------------------
    // Validation
    // ----------------------------

    if (
        fullName === "" ||
        email === "" ||
        phone === "" ||
        education === "" ||
        skills === "" ||
        experience === ""
    ) {

        alert("Please fill in all required fields.");

        return;

    }

    // ----------------------------
    // Create Image
    // ----------------------------

    let imageHTML = "";

    if (profileImage) {

        const imageURL = URL.createObjectURL(profileImage);

        imageHTML = `
            <img
                src="${imageURL}"
                class="resume-photo"
                alt="Profile Picture">
        `;

    }

    // ----------------------------
    // Skills List
    // ----------------------------

    const skillsHTML = skills
        .split("\n")
        .filter(skill => skill.trim() !== "")
        .map(skill => `<li>${skill}</li>`)
        .join("");

    // ----------------------------
    // Projects List
    // ----------------------------

    const projectsHTML = projects
        .split("\n")
        .filter(project => project.trim() !== "")
        .map(project => `<li>${project}</li>`)
        .join("");

    // ----------------------------
    // Languages List
    // ----------------------------

    const languagesHTML = languages
        .split("\n")
        .filter(language => language.trim() !== "")
        .map(language => `<li>${language}</li>`)
        .join("");

    // ----------------------------
    // Resume HTML
    // ----------------------------

    currentResumeHTML = `

        ${imageHTML}

        <h2 class="resume-title">${fullName}</h2>

        <div class="resume-section">

            <h3>Contact</h3>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${phone}</p>

            <p><strong>Address:</strong> ${address}</p>

        </div>

        <div class="resume-section">

            <h3>Education</h3>

            <p>${education.replace(/\n/g, "<br>")}</p>

        </div>

        <div class="resume-section">

            <h3>Skills</h3>

            <ul>
                ${skillsHTML}
            </ul>

        </div>

        <div class="resume-section">

            <h3>Experience</h3>

            <p>${experience.replace(/\n/g, "<br>")}</p>

        </div>

        <div class="resume-section">

            <h3>Projects</h3>

            <ul>
                ${projectsHTML}
            </ul>

        </div>

        <div class="resume-section">

            <h3>Languages</h3>

            <ul>
                ${languagesHTML}
            </ul>

        </div>

    `;

    // ----------------------------
    // Show Resume
    // ----------------------------

    resumeOutput.style.display = "block";

    resumeOutput.innerHTML = currentResumeHTML;

});

// =========================================
// Download PDF
// =========================================

downloadBtn.addEventListener("click", function () {

    if (currentResumeHTML === "") {

        alert("Please generate your resume first.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("AI Resume Builder Pro", 20, y);

    y += 15;

    doc.setFontSize(12);

    doc.text(
        "Download the generated resume from the preview section.",
        20,
        y
    );

    y += 20;

    doc.text(
        "Tip: In the next version, this PDF will include the complete",
        20,
        y
    );

    y += 8;

    doc.text(
        "formatted resume with images and professional layout.",
        20,
        y
    );

    doc.save("My_Resume.pdf");

});