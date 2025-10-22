// Vietnamese Women's Day Gift Card Website JavaScript

// Modal functionality
function openModal() {
    document.getElementById('giftModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('giftModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('giftModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// AI Message Generation
document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generateAI');
    const messageTextarea = document.getElementById('message');
    const relationshipSelect = document.getElementById('relationship');
    const receiverInput = document.getElementById('receiver');
    const aiLoading = document.getElementById('aiLoading');

    if (generateBtn) {
        generateBtn.addEventListener('click', async function () {
            const receiver = receiverInput.value.trim();
            const relationship = relationshipSelect.value;

            if (!receiver) {
                alert('Vui lòng nhập tên người nhận trước khi tạo tin nhắn AI!');
                receiverInput.focus();
                return;
            }

            // Show loading
            aiLoading.style.display = 'block';
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo...';

            try {
                const response = await fetch('/api/generate-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        relationship: relationship,
                        receiver: receiver
                    })
                });

                const data = await response.json();

                if (data.success) {
                    messageTextarea.value = data.message;
                    messageTextarea.focus();

                    // Show success message
                    showNotification('Tin nhắn AI đã được tạo thành công!', 'success');
                } else {
                    showNotification(data.message || 'Không thể tạo tin nhắn AI. Vui lòng thử lại.', 'error');
                }
            } catch (error) {
                console.error('Error generating AI message:', error);
                showNotification('Có lỗi xảy ra khi tạo tin nhắn AI. Vui lòng thử lại.', 'error');
            } finally {
                // Hide loading
                aiLoading.style.display = 'none';
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-magic"></i> Tạo bằng AI';
            }
        });
    }

    // Form validation
    const giftForm = document.getElementById('giftForm');
    if (giftForm) {
        giftForm.addEventListener('submit', function (e) {
            const receiver = document.getElementById('receiver').value.trim();
            const sender = document.getElementById('sender').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!receiver || !sender || !message) {
                e.preventDefault();
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }

            if (message.length < 10) {
                e.preventDefault();
                showNotification('Tin nhắn quá ngắn. Vui lòng viết ít nhất 10 ký tự!', 'error');
                document.getElementById('message').focus();
                return;
            }

            // Show loading on submit
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo thiệp...';
        });
    }

    // File upload validation
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                // Check file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
                    e.target.value = '';
                    return;
                }

                // Check file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Chỉ chấp nhận file ảnh (JPG, PNG, GIF)!');
                    e.target.value = '';
                    return;
                }

                // Show preview
                showImagePreview(file);
            }
        });
    }
});

// Show image preview
function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        // Remove existing preview
        const existingPreview = document.querySelector('.image-preview');
        if (existingPreview) {
            existingPreview.remove();
        }

        // Create preview element
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
            <div style="margin-top: 10px; text-align: center;">
                <img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 150px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <p style="margin-top: 5px; color: #666; font-size: 0.9rem;">Ảnh đã chọn</p>
            </div>
        `;

        // Insert after file input
        const imageInput = document.getElementById('image');
        imageInput.parentNode.insertBefore(preview, imageInput.nextSibling);
    };
    reader.readAsDataURL(file);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

// Share functionality
function shareContent(title, text, url) {
    if (navigator.share) {
        return navigator.share({
            title: title,
            text: text,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        return copyToClipboard(url).then(() => {
            showNotification('Đã sao chép link vào clipboard!', 'success');
        });
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading states to buttons
function addLoadingState(button, loadingText = 'Đang xử lý...') {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;

    return function removeLoadingState() {
        button.disabled = false;
        button.innerHTML = originalText;
    };
}

// Form auto-save (optional feature)
function autoSaveForm() {
    const form = document.getElementById('giftForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            localStorage.setItem('giftFormData', JSON.stringify(data));
        });
    });

    // Restore saved data
    const savedData = localStorage.getItem('giftFormData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && input.type !== 'file') {
                    input.value = data[key];
                }
            });
        } catch (e) {
            console.error('Error restoring form data:', e);
        }
    }

    // Clear saved data on successful submit
    form.addEventListener('submit', function () {
        localStorage.removeItem('giftFormData');
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', autoSaveForm);

