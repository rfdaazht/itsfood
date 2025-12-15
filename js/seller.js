/* ===================================
   DESIGN PATTERN: State Pattern
   Location: Tab switching functionality
   Purpose: Manage different UI states
   Source: Gang of Four Design Patterns
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.dataset.tab;

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});