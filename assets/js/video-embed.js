!function(){
  "use strict";
  !function(){
    const placeholders = document.querySelectorAll(".embed-placeholder");
    
    for(let i=0; i < placeholders.length; i++){
      const placeholder = placeholders[i];
      const provider = placeholder.dataset.embedProvider;
      if (provider == 'youtube' || provider == 'vimeo') {
        const button = document.createElement("button");
        button.setAttribute("aria-label", "Play");
        button.innerHTML = '<svg class="icon" viewBox="0 0 24 24" width="3em" height="3em" aria-hidden="true"><use xlink:href="#icon-play"></use></svg>';
               
        const container = document.createElement("div");
        container.innerHTML = placeholder.innerHTML;
        container.className = "embed-video";
        container.appendChild(button);
        placeholder.parentNode.insertBefore(container, placeholder);
        placeholder.remove();
        
        button.addEventListener("click", function(event) {
          button.remove();
          const iframe = document.createElement("iframe");
          iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');
          iframe.setAttribute('frameborder', '0');
          if (provider == 'youtube') {
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + placeholder.dataset.embedId + '?autoplay=1&rel=0&modestbranding=1');
          } else if (provider == 'vimeo') {
            iframe.setAttribute('src', 'https://player.vimeo.com/video/' + placeholder.dataset.embedId + '?autoplay=1');
          }
          container.insertBefore(iframe, container.firstChild);
          iframe.addEventListener("load", function() {
            container.querySelector("img").remove();
          });
        });
      };
    }
  }()
}();
