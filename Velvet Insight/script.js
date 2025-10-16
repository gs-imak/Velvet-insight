// Velvet Insight - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Filter pills selection
  const filterPills = document.querySelectorAll('.special-pill');
  const selectedFilters = new Set();
  
  filterPills.forEach(pill => {
    pill.addEventListener('click', function() {
      this.classList.toggle('active');
      const filterText = this.textContent.trim();
      
      if (this.classList.contains('active')) {
        selectedFilters.add(filterText);
      } else {
        selectedFilters.delete(filterText);
      }
    });
  });
  
  // Reset filters
  const resetButtons = document.querySelectorAll('.filter-reset');
  resetButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterPills.forEach(pill => pill.classList.remove('active'));
      selectedFilters.clear();
    });
  });
  
  // Favorite buttons
  const favButtons = document.querySelectorAll('.btn-fav, .btn-bd-special-3');
  favButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Don't follow link if it's wrapped in an anchor
      if (this.closest('a')) {
        e.preventDefault();
      }
      
      this.classList.toggle('favorited');
      const icon = this.querySelector('.ico-heart, .ico-fav');
      
      if (icon) {
        // Toggle between filled and outline heart
        if (this.classList.contains('favorited')) {
          icon.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(93%) saturate(2740%) hue-rotate(329deg) brightness(94%) contrast(91%)';
        } else {
          icon.style.filter = 'none';
        }
      }
    });
  });
  
  // Category pills in create modal
  const createModalPills = document.querySelectorAll('#createModal .special-pill, #filterModal .special-pill');
  createModalPills.forEach(pill => {
    pill.addEventListener('click', function() {
      // Limit to 2 selections in create modal
      const modal = this.closest('.modal');
      const selectedPills = modal.querySelectorAll('.special-pill.active');
      
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else if (selectedPills.length < 2) {
        this.classList.add('active');
      } else {
        // Show message if trying to select more than 2
        const firstSelected = selectedPills[0];
        firstSelected.classList.remove('active');
        this.classList.add('active');
      }
    });
  });
  
  // Clear modal forms on close
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('hidden.bs.modal', function() {
      const form = this.querySelector('form');
      if (form) {
        form.reset();
      }
      const pills = this.querySelectorAll('.special-pill.active');
      pills.forEach(pill => pill.classList.remove('active'));
    });
  });
  
  // Confirm button in create modal
  const createConfirmBtn = document.querySelector('#createModal .button-mod-2');
  if (createConfirmBtn) {
    createConfirmBtn.addEventListener('click', function() {
      const urlInput = document.querySelector('#urlInput');
      const selectedCategories = document.querySelectorAll('#createModal .special-pill.active');
      
      if (urlInput && urlInput.value && selectedCategories.length > 0) {
        // Simulate adding the content
        console.log('Adding content:', {
          url: urlInput.value,
          categories: Array.from(selectedCategories).map(p => p.textContent.trim())
        });
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createModal'));
        modal.hide();
        
        // Show success message (you could add a toast notification here)
        alert('Publication ajoutée avec succès !');
      } else {
        alert('Veuillez remplir l\'URL et sélectionner au moins une catégorie.');
      }
    });
  }
  
  // Delete confirmation
  const deleteConfirmBtn = document.querySelector('#deleteModal .button-mod-2');
  if (deleteConfirmBtn) {
    deleteConfirmBtn.addEventListener('click', function() {
      // Simulate deletion
      console.log('Deleting content');
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
      if (modal) {
        modal.hide();
      }
      
      // Show success message
      setTimeout(() => {
        alert('Publication supprimée avec succès !');
      }, 300);
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
});

