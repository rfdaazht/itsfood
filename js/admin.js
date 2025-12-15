/*
   DESIGN PATTERN: Command Pattern
   Location: Verification action handlers
   Purpose: Encapsulate actions as objects
   Source: Gang of Four Design Patterns
*/

document.addEventListener('DOMContentLoaded', function () {
    // Verification buttons
    const verifyBtns = document.querySelectorAll('.btn-success:not([disabled])');
    const deleteBtns = document.querySelectorAll('.btn-danger');
    const pendingBtns = document.querySelectorAll('.btn-warning');

    verifyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Verifikasi toko ini?')) {
                alert('Toko berhasil diverifikasi!');
                this.disabled = true;
            }
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Hapus toko ini?')) {
                alert('Toko berhasil dihapus!');
                this.closest('.verification-card').remove();
            }
        });
    });

    pendingBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Verifikasi toko ini?')) {
                alert('Toko berhasil diverifikasi!');
                this.textContent = 'Terverifikasi';
                this.classList.remove('btn-warning');
                this.classList.add('btn-success');
                this.closest('.verification-card').classList.remove('pending');
            }
        });
    });
});