document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Scroll Effects & Header Management
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 2. Mobile Navigation Toggle
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('mobile-open');
    });
  });

  // ==========================================
  // 3. Booking Modal Controls
  // ==========================================
  const bookingModal = document.getElementById('booking-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalSubtitleWrapper = document.getElementById('modal-subtitle-wrapper');
  const modalDescription = document.getElementById('modal-description');
  const tripSelect = document.getElementById('select-trip');
  const packageSelect = document.getElementById('select-package');
  const bookingOnlyRows = document.querySelectorAll('.booking-only');
  
  // Open modal triggers
  const bookingTriggers = document.querySelectorAll('.btn-book-trip');
  const headerBookBtn = document.getElementById('btn-header-book');
  const heroEnquireBtn = document.getElementById('btn-hero-enquire');

  let currentModalMode = 'booking';

  function updateBookingFields(enabled) {
    bookingOnlyRows.forEach(row => {
      row.style.display = enabled ? 'grid' : 'none';
      row.querySelectorAll('select, input').forEach(control => {
        control.disabled = !enabled;
      });
    });
  }

  function openModal(mode = 'booking', defaultTripName = '') {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    currentModalMode = mode;

    if (mode === 'enquiry') {
      modalTitle.textContent = 'Submit an Enquiry';
      modalSubtitleWrapper.style.display = 'none';
      modalDescription.textContent = 'Share your travel questions or requests and our team will reach out with the best plan for you.';
      document.getElementById('btn-booking-submit').textContent = 'Send Enquiry';
      document.getElementById('form-success-text').textContent = 'Enquiry sent successfully! We will call you on ';
      document.getElementById('form-success-suffix').textContent = ' shortly.';
      updateBookingFields(false);
      tripSelect.value = '';
      packageSelect.value = 'Group travel';
    } else {
      modalTitle.textContent = 'Book Your Travel Slot';
      modalSubtitleWrapper.style.display = '';
      modalSubtitle.textContent = defaultTripName || 'Queen Elizabeth National Park';
      modalDescription.textContent = 'Send in your details and our team will get back to you with the itinerary booking details.';
      document.getElementById('btn-booking-submit').textContent = 'Confirm Reservation';
      document.getElementById('form-success-text').textContent = 'Reservation request sent successfully! We will call you on ';
      document.getElementById('form-success-suffix').textContent = ' shortly.';
      updateBookingFields(true);
      if (defaultTripName) {
        tripSelect.value = defaultTripName;
        packageSelect.value = defaultTripName === 'Queen Elizabeth Safari' ? 'Single traveler' : 'Group travel';
      } else {
        tripSelect.value = '';
      }
    }
  }

  function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
    
    // Reset form success state if open
    document.getElementById('form-success-box').style.display = 'none';
  }

  // Bind booking cards buttons
  bookingTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const tripName = button.getAttribute('data-trip');
      openModal('booking', tripName);
    });
  });

  // Bind header and hero general buttons
  headerBookBtn.addEventListener('click', () => openModal('booking'));
  heroEnquireBtn.addEventListener('click', () => openModal('enquiry'));

  // Close modal bindings
  modalCloseBtn.addEventListener('click', closeBookingModal);
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  const legalModal = document.getElementById('legal-modal-overlay');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalBody = document.getElementById('legal-modal-body');
  const legalModalClose = document.getElementById('legal-modal-close');
  const footerPrivacyLink = document.getElementById('footer-privacy-link');
  const footerTermsLink = document.getElementById('footer-terms-link');

  function openLegalModal(type) {
    legalModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (type === 'terms') {
      legalModalTitle.textContent = 'Terms of Service';
      legalModalBody.innerHTML = `
        <h4>Terms of Service</h4>
        <p>By using the Scenes Tours & Travels website, you agree to the terms and conditions of our travel planning services.</p>
        <p>All bookings are subject to availability, confirmation by our team, and payment of any required deposits. Prices and itineraries may change until your booking is confirmed.</p>
        <p>We are not responsible for changes by third-party service providers, weather delays, or travel restrictions. Please review each trip offer carefully and contact us if you have any questions.</p>
      `;
    } else {
      legalModalTitle.textContent = 'Privacy Policy';
      legalModalBody.innerHTML = `
        <h4>Privacy Policy</h4>
        <p>We respect your privacy. Any information you share through booking or enquiry forms is used only to process your request, contact you, and support your travel plans.</p>
        <p>We do not sell your personal details. Your name, phone number, email address, and travel preferences may be stored to improve our service and follow up on booking requests.</p>
        <p>By using this site, you consent to personal data being used for travel coordination and customer support.</p>
      `;
    }
  }

  function closeLegalModal() {
    legalModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  footerPrivacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openLegalModal('privacy');
  });

  footerTermsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openLegalModal('terms');
  });

  legalModalClose.addEventListener('click', closeLegalModal);
  legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      closeLegalModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal.classList.contains('active')) {
        closeBookingModal();
      }
      if (legalModal.classList.contains('active')) {
        closeLegalModal();
      }
    }
  });

  // ==========================================
  // 4. Booking Form Submission & Validation
  // ==========================================
  const bookingForm = document.getElementById('booking-form');
  const formSuccessBox = document.getElementById('form-success-box');
  const phoneOutput = document.getElementById('output-phone');
  const btnSubmit = document.getElementById('btn-booking-submit');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientPhone = document.getElementById('client-phone').value;
    
    // Disable inputs and show loading state
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Processing Booking...';

    setTimeout(() => {
      // Set success box elements
      phoneOutput.textContent = clientPhone;
      formSuccessBox.style.display = 'block';

      // Reset form controls
      bookingForm.reset();
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Confirm Reservation';

      // Auto close modal after a display duration
      setTimeout(() => {
        closeBookingModal();
      }, 4000);

    }, 1500);
  });

  // ==========================================
  // 5. Scroll Animations (Intersection Observer)
  // ==========================================
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animateElements.forEach(element => {
    animationObserver.observe(element);
  });

});
