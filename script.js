// script.js
let profiles = [];
let jobs = [];

// Simple routing
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(e.target.getAttribute('href').substr(1));
    });
});

// Admin functions
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const skills = document.getElementById('profileSkills').value.split(',').map(skill => skill.trim());
    
    profiles.push({ name, email, skills });
    updateProfileList();
    this.reset();
});

document.getElementById('jobForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('jobTitle').value;
    const company = document.getElementById('jobCompany').value;
    const requiredSkills = document.getElementById('jobSkills').value.split(',').map(skill => skill.trim());
    
    jobs.push({ title, company, requiredSkills });
    updateJobList();
    this.reset();
});

function updateProfileList() {
    const profileList = document.getElementById('profileList');
    profileList.innerHTML = profiles.map(profile => `
        <div class="list-item">
            <strong>${profile.name}</strong> (${profile.email})<br>
            Skills: ${profile.skills.join(', ')}
        </div>
    `).join('');
}

function updateJobList() {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = jobs.map(job => `
        <div class="list-item">
            <strong>${job.title}</strong> at ${job.company}<br>
            Required Skills: ${job.requiredSkills.join(', ')}
        </div>
    `).join('');
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    // Here you would typically send this data to a server
    console.log('Contact form submitted:', { name, email, message });
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});

// Initialize with some sample data
profiles.push(
    { name: "John Doe", email: "john@example.com", skills: ["JavaScript", "React", "Node.js"] },
    { name: "Jane Smith", email: "jane@example.com", skills: ["Python", "Data Analysis", "Machine Learning"] }
);
jobs.push(
    { title: "Frontend Developer", company: "Tech Co", requiredSkills: ["JavaScript", "React", "CSS"] },
    { title: "Data Scientist", company: "Data Corp", requiredSkills: ["Python", "Machine Learning", "SQL"] }
);
updateProfileList();
updateJobList();

// Admin access (you would typically handle this server-side)
const adminPassword = "admin123"; // This is not secure, just for demonstration
function accessAdmin() {
    const password = prompt("Enter admin password:");
    if (password === adminPassword) {
        navigate('admin');
    } else {
        alert("Incorrect password");
    }
}

// Add admin access to window for demo purposes
window.accessAdmin = accessAdmin;