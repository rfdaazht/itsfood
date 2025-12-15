/* ===================================
   DESIGN PATTERN: Event-Driven Programming
   Location: Event listeners and handlers
   Purpose: Reactive UI updates based on user actions
   Source: Observer Pattern (Gang of Four)
   =================================== */

// Role button toggle
document.addEventListener('DOMContentLoaded', function () {
    const roleButtons = document.querySelectorAll('.role-btn');

    roleButtons.forEach(button => {
        button.addEventListener('click', function () {
            roleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});