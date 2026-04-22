// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. WhatsApp & Email Triggers logic
// ==========================================
const contactConfig = {
    whatsapp: "61400000000", // Replace with actual number
    email: "contact@rapidmortgage.com.au",
    message: "Hi Rapid Mortgage Brokers, I'm interested in booking a consultation."
};

function bookWhatsApp() {
    const url = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(contactConfig.message)}`;
    window.open(url, '_blank');
}

function sendEmail() {
    window.location.href = `mailto:${contactConfig.email}?subject=Appointment Request&body=${contactConfig.message}`;
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 2. Hero Animations
    // ==========================================
    
    // Initial load animation
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-title-line", 
        { y: 150, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.2 }
    )
    .fromTo("#hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
    )
    .fromTo("nav", 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
    );

    // Hero Parallax on mouse movement
    const heroSection = document.getElementById("hero");
    const heroImg = document.getElementById("hero-img");
    const heroContent = document.getElementById("hero-content");
    
    heroSection.addEventListener("mousemove", (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20; // Max 20px offset
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(heroImg, {
            x: xPos * -1.5,
            y: yPos * -1.5,
            duration: 1,
            ease: "power2.out"
        });
        
        gsap.to(heroContent, {
            x: xPos * 0.5,
            y: yPos * 0.5,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Reset on mouse leave
    heroSection.addEventListener("mouseleave", () => {
        gsap.to([heroImg, heroContent], { x: 0, y: 0, duration: 1, ease: "power2.out" });
    });

    // ==========================================
    // 3. Liquid Distortion Reveal
    // ==========================================
    
    const revealElements = document.querySelectorAll(".liquid-reveal");
    
    revealElements.forEach((elem) => {
        // Set initial state
        gsap.set(elem, { 
            visibility: "visible", 
            opacity: 0, 
            y: 50, 
            filter: "blur(10px)",
            scale: 0.95
        });
        
        ScrollTrigger.create({
            trigger: elem,
            start: "top 85%",
            onEnter: () => {
                gsap.to(elem, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.75)" // Spring physics bounce
                });
            }
        });
    });

    // ==========================================
    // 4. Tilt and Glow Cards
    // ==========================================
    
    const cards = document.querySelectorAll(".service-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: "power2.out",
                duration: 0.5
            });
        });
        
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: "elastic.out(1, 0.5)", // Spring logic
                duration: 1.2
            });
        });
    });

    // ==========================================
    // 5. SVG Timeline Drawing
    // ==========================================
    
    const drawPath = document.getElementById("timeline-path-draw");
    if(drawPath) {
        const length = drawPath.getTotalLength();
        
        // Prepare the path
        gsap.set(drawPath, {
            strokeDasharray: length,
            strokeDashoffset: length
        });
        
        // Draw path based on scroll
        gsap.to(drawPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: "#process",
                start: "top 50%",
                end: "bottom 80%",
                scrub: 1 // Smooth scrubbing
            }
        });

        // Animate dots lighting up
        const dots = document.querySelectorAll(".step-dot");
        dots.forEach((dot, index) => {
            gsap.fromTo(dot, 
                { backgroundColor: "#0A0A0B", scale: 0.5 },
                { 
                    backgroundColor: "#00D4FF", 
                    scale: 1, 
                    boxShadow: "0 0 15px rgba(0, 212, 255, 0.8)",
                    scrollTrigger: {
                        trigger: dot,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

});
