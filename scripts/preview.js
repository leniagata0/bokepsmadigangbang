// /scripts/preview.js
document.querySelectorAll('.video-card').forEach(card => {
    const videoPreview = card.querySelector('.video-preview');

    if (videoPreview) {
      // playTimeout is no longer needed for the delay, but we'll keep it for desktop-specific logic if needed elsewhere.
      // If this is the only place it's used, you can actually remove `let playTimeout;` entirely.

      card.addEventListener('mouseenter', () => {
        // No clearTimeout(playTimeout) here, as there's no timeout to clear for instant playback.
        
        // Directly execute the playback logic without any delay
        if (!card.classList.contains('video-preview-error')) {
          const src = videoPreview.getAttribute('data-src');
          if (src && videoPreview.src !== src) {
            videoPreview.src = src;
            videoPreview.load();
          }
          videoPreview.play().catch(e => {
            console.warn('Video playback failed, adding error class:', e);
            card.classList.add('video-preview-error');
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        // No clearTimeout(playTimeout) here, as there's no pending timeout from mouseenter.
        if (videoPreview && !videoPreview.paused) {
          videoPreview.pause();
          videoPreview.currentTime = 0; // Reset to start
        }
      });
    }
  });
