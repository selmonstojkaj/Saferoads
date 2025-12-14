 // Save settings function
        function saveSettings() {
            // Collect all settings
            const settings = {
                profile: {
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value
                },
                notifications: {
                    email: document.getElementById('emailNotifications').checked,
                    push: document.getElementById('pushNotifications').checked,
                    incidents: document.getElementById('incidentAlerts').checked,
                    reports: document.getElementById('reportUpdates').checked
                },
                system: {
                    language: document.getElementById('language').value,
                    timezone: document.getElementById('timezone').value,
                    dateFormat: document.getElementById('dateFormat').value,
                    autoRefresh: document.getElementById('autoRefresh').checked,
                    refreshInterval: document.getElementById('refreshInterval').value
                },
                security: {
                    twoFactor: document.getElementById('twoFactor').checked,
                    sessionTimeout: document.getElementById('sessionTimeout').value
                }
            };

            // Save to localStorage (or send to server)
            localStorage.setItem('safeRoadSettings', JSON.stringify(settings));

            // Show success message
            const saveMessage = document.getElementById('saveMessage');
            saveMessage.classList.add('show');
            setTimeout(() => {
                saveMessage.classList.remove('show');
            }, 3000);
        }

        // Load settings on page load
        function loadSettings() {
            const saved = localStorage.getItem('safeRoadSettings');
            if (saved) {
                const settings = JSON.parse(saved);
                
                // Load profile settings
                if (settings.profile) {
                    if (settings.profile.fullName) document.getElementById('fullName').value = settings.profile.fullName;
                    if (settings.profile.email) document.getElementById('email').value = settings.profile.email;
                    if (settings.profile.phone) document.getElementById('phone').value = settings.profile.phone;
                }
                
                // Load notification settings
                if (settings.notifications) {
                    document.getElementById('emailNotifications').checked = settings.notifications.email !== false;
                    document.getElementById('pushNotifications').checked = settings.notifications.push !== false;
                    document.getElementById('incidentAlerts').checked = settings.notifications.incidents !== false;
                    document.getElementById('reportUpdates').checked = settings.notifications.reports === true;
                }
                
                // Load system settings
                if (settings.system) {
                    if (settings.system.language) document.getElementById('language').value = settings.system.language;
                    if (settings.system.timezone) document.getElementById('timezone').value = settings.system.timezone;
                    if (settings.system.dateFormat) document.getElementById('dateFormat').value = settings.system.dateFormat;
                    document.getElementById('autoRefresh').checked = settings.system.autoRefresh !== false;
                    if (settings.system.refreshInterval) document.getElementById('refreshInterval').value = settings.system.refreshInterval;
                }
                
                // Load security settings
                if (settings.security) {
                    document.getElementById('twoFactor').checked = settings.security.twoFactor === true;
                    if (settings.security.sessionTimeout) document.getElementById('sessionTimeout').value = settings.security.sessionTimeout;
                }
            }
        }

        // Password modal functions
        function openPasswordModal() {
            document.getElementById('passwordModal').style.display = 'block';
            // Reset form state
            document.getElementById('passwordForm').reset();
            document.getElementById('passwordStrength').classList.remove('show');
            document.getElementById('passwordRequirements').classList.remove('show');
            document.getElementById('passwordMatch').style.display = 'none';
            document.getElementById('passwordMismatch').style.display = 'none';
        }

        function closePasswordModal() {
            document.getElementById('passwordModal').style.display = 'none';
            document.getElementById('passwordForm').reset();
            // Reset all visual indicators
            document.getElementById('passwordStrength').classList.remove('show');
            document.getElementById('passwordRequirements').classList.remove('show');
            document.getElementById('passwordMatch').style.display = 'none';
            document.getElementById('passwordMismatch').style.display = 'none';
        }

        // Export data function
        function exportData() {
            const settings = localStorage.getItem('safeRoadSettings');
            const dataStr = JSON.stringify(settings ? JSON.parse(settings) : {}, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'safeRoad-data-export.json';
            link.click();
            URL.revokeObjectURL(url);
        }

        // Delete account function
        function deleteAccount() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
                    alert('Account deletion requested. Please contact support to complete this process.');
                }
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadSettings();

            // Password modal handlers
            const passwordModal = document.getElementById('passwordModal');
            const closePasswordBtn = document.getElementById('closePasswordModal');
            const passwordForm = document.getElementById('passwordForm');

            if (closePasswordBtn) {
                closePasswordBtn.onclick = closePasswordModal;
            }

            window.onclick = function(event) {
                if (event.target == passwordModal) {
                    closePasswordModal();
                }
            }

            // Password strength checker
            function checkPasswordStrength(password) {
                let strength = 0;
                const requirements = {
                    length: password.length >= 8,
                    uppercase: /[A-Z]/.test(password),
                    lowercase: /[a-z]/.test(password),
                    number: /[0-9]/.test(password)
                };

                if (requirements.length) strength++;
                if (requirements.uppercase) strength++;
                if (requirements.lowercase) strength++;
                if (requirements.number) strength++;

                return { strength, requirements };
            }

            function updatePasswordStrength(password) {
                const strengthBar = document.getElementById('passwordStrengthBar');
                const strengthContainer = document.getElementById('passwordStrength');
                const requirementsDiv = document.getElementById('passwordRequirements');
                
                if (password.length === 0) {
                    strengthContainer.classList.remove('show');
                    requirementsDiv.classList.remove('show');
                    return;
                }

                strengthContainer.classList.add('show');
                requirementsDiv.classList.add('show');

                const { strength, requirements } = checkPasswordStrength(password);
                
                // Update strength bar
                strengthBar.className = 'password-strength-bar';
                if (strength <= 1) {
                    strengthBar.classList.add('weak');
                } else if (strength <= 2) {
                    strengthBar.classList.add('medium');
                } else {
                    strengthBar.classList.add('strong');
                }

                // Update requirements list
                document.getElementById('req-length').className = requirements.length ? 'valid' : 'invalid';
                document.getElementById('req-uppercase').className = requirements.uppercase ? 'valid' : 'invalid';
                document.getElementById('req-lowercase').className = requirements.lowercase ? 'valid' : 'invalid';
                document.getElementById('req-number').className = requirements.number ? 'valid' : 'invalid';

                // Update requirement icons
                const reqLength = document.getElementById('req-length');
                const reqUppercase = document.getElementById('req-uppercase');
                const reqLowercase = document.getElementById('req-lowercase');
                const reqNumber = document.getElementById('req-number');
                
                reqLength.querySelector('i').className = requirements.length ? 'fa-solid fa-check-circle' : 'fa-solid fa-circle';
                reqUppercase.querySelector('i').className = requirements.uppercase ? 'fa-solid fa-check-circle' : 'fa-solid fa-circle';
                reqLowercase.querySelector('i').className = requirements.lowercase ? 'fa-solid fa-check-circle' : 'fa-solid fa-circle';
                reqNumber.querySelector('i').className = requirements.number ? 'fa-solid fa-check-circle' : 'fa-solid fa-circle';
            }

            function checkPasswordMatch() {
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const matchDiv = document.getElementById('passwordMatch');
                const mismatchDiv = document.getElementById('passwordMismatch');

                if (confirmPassword.length === 0) {
                    matchDiv.style.display = 'none';
                    mismatchDiv.style.display = 'none';
                    return;
                }

                if (newPassword === confirmPassword && newPassword.length > 0) {
                    matchDiv.style.display = 'block';
                    mismatchDiv.style.display = 'none';
                } else {
                    matchDiv.style.display = 'none';
                    mismatchDiv.style.display = 'block';
                }
            }

            // Add event listeners for real-time validation
            const newPasswordInput = document.getElementById('newPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            newPasswordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
                checkPasswordMatch();
            });

            confirmPasswordInput.addEventListener('input', function() {
                checkPasswordMatch();
            });

            passwordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentPassword = this.currentPassword.value;
                const newPassword = this.newPassword.value;
                const confirmPassword = this.confirmPassword.value;

                // Validation
                if (!currentPassword) {
                    alert('Please enter your current password.');
                    this.currentPassword.focus();
                    return;
                }

                if (newPassword.length < 8) {
                    alert('Password must be at least 8 characters long!');
                    this.newPassword.focus();
                    return;
                }

                const { requirements } = checkPasswordStrength(newPassword);
                if (!requirements.uppercase || !requirements.lowercase || !requirements.number) {
                    alert('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
                    this.newPassword.focus();
                    return;
                }

                if (newPassword !== confirmPassword) {
                    alert('New passwords do not match!');
                    this.confirmPassword.focus();
                    return;
                }

                // Success - show professional notification
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert('Password updated successfully!');
                    closePasswordModal();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        });