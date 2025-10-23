document.addEventListener("DOMContentLoaded", function() {

    const typingElement = document.querySelector(".typing-effect");

    if (typingElement) {
        const words = JSON.parse(typingElement.getAttribute("data-words"));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150; 

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                
                charIndex--;
                typingElement.textContent = currentWord.substring(0, charIndex);
            } else {
                
                charIndex++;
                typingElement.textContent = currentWord.substring(0, charIndex);
            }

            typeSpeed = isDeleting ? 75 : 150;

            
            if (!isDeleting && charIndex === currentWord.length) {
                
                typeSpeed = 1500; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
            
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; 
                typeSpeed = 500; 
            }

            setTimeout(type, typeSpeed);
        }

        
        type();
    }



    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".sidebar-nav a.nav-link");

    function activateNavLink() {
        let currentSectionId = "";
        
        
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; 
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        
        navLinks.forEach(link => {
            link.classList.remove("active");
            
            if (link.getAttribute("href") === "#" + currentSectionId) {
                link.classList.add("active");
            }
        });
    }

    
    window.addEventListener("scroll", activateNavLink);
    activateNavLink(); 

});