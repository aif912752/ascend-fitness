// ASCEND PERFORMANCE - Cinematic Landing Page
// Complete animation system with Three.js and GSAP ScrollTrigger

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initVideoLoading();
    initThreeJS();
    initAnimations();
    initParticles();
    initPerformanceScene();
    initNav();
});

// ============================================
// SMOOTH SCROLL SYSTEM (LENIS)
// ============================================
let lenis;
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor clicks with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
}

// ============================================
// NAVIGATION SYSTEM
// ============================================
function initNav() {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        // Scrolled state
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// VIDEO LOADING SYSTEM
// ============================================
function initVideoLoading() {
    // Handle all video elements
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // Add loaded class when video can play
        video.addEventListener('canplay', () => {
            video.classList.add('loaded');
        }, { once: true });

        // Fallback: add loaded class after timeout
        setTimeout(() => {
            if (!video.classList.contains('loaded')) {
                video.classList.add('loaded');
            }
        }, 3000);

        // Ensure videos autoplay
        video.play().catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    });
}

// ============================================
// THREE.JS BACKGROUND SYSTEM
// ============================================
function initThreeJS() {
    const canvas = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating Geometric Shapes
    const geometryGroup = new THREE.Group();

    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(-3, 1, -2);
    geometryGroup.add(icosahedron);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x888888,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, -1, -3);
    geometryGroup.add(torus);

    // Octahedron
    const octGeometry = new THREE.OctahedronGeometry(0.4, 0);
    const octMaterial = new THREE.MeshBasicMaterial({
        color: 0x999999,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const octahedron = new THREE.Mesh(octGeometry, octMaterial);
    octahedron.position.set(2, 2, -4);
    geometryGroup.add(octahedron);

    scene.add(geometryGroup);

    camera.position.z = 2;

    // Mouse Movement Effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        const elapsedTime = clock.getElapsedTime();

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Animate geometric shapes
        icosahedron.rotation.x += 0.005;
        icosahedron.rotation.y += 0.005;
        icosahedron.position.y = 1 + Math.sin(elapsedTime * 0.5) * 0.3;

        torus.rotation.x += 0.003;
        torus.rotation.y += 0.007;
        torus.position.y = -1 + Math.cos(elapsedTime * 0.4) * 0.3;

        octahedron.rotation.x += 0.004;
        octahedron.rotation.z += 0.006;
        octahedron.position.y = 2 + Math.sin(elapsedTime * 0.6) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll-based camera movement
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(camera.position, {
        scrollTrigger: {
            trigger: '#mindset',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        z: 3,
        ease: 'none'
    });

    gsap.to(geometryGroup.rotation, {
        scrollTrigger: {
            trigger: '#performance',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: Math.PI * 2,
        ease: 'none'
    });
}

// ============================================
// GSAP SCROLLTRIGGER ANIMATIONS
// ============================================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations - Keep visible
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Don't animate hero elements - keep them visible
    // heroTimeline
    //     .to('.hero-title', {
    //         opacity: 1,
    //         y: 0,
    //         duration: 1.5,
    //         delay: 0.5
    //     })
    //     .to('.hero-subtitle', {
    //         opacity: 1,
    //         y: 0,
    //         duration: 1
    //     }, '-=0.5')
    //     .to('.hero-cta', {
    //         opacity: 1,
    //         y: 0,
    //         duration: 1
    //     }, '-=0.5')
    //     .from('.hero-title', {
    //         scale: 1.1,
    //         duration: 2
    //     }, 0);

    // Set initial states - keep visible
    gsap.set('.hero-title', { opacity: 1, y: 0 });
    gsap.set('.hero-subtitle', { opacity: 1, y: 0 });
    gsap.set('.hero-cta', { opacity: 1, y: 0 });

    // Hero parallax on scroll
    gsap.to('.hero-container', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.3,
        scale: 0.9
    });

    // Mindset Section Animations
    const mindsetItems = document.querySelectorAll('.mindset-item');

    mindsetItems.forEach((item, index) => {
        const content = item.querySelector('.mindset-content');
        const visual = item.querySelector('.mindset-visual');
        const bg = item.querySelector('.mindset-bg');

        // Content animation
        gsap.fromTo(content,
            {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100
            },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1
                },
                opacity: 1,
                x: 0
            }
        );

        // Visual parallax
        gsap.fromTo(visual,
            {
                scale: 1.1,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1
                },
                scale: 1,
                opacity: 1
            }
        );

        // Background movement
        gsap.to(bg, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });

    // Training Experience Cards - Sticky Transition Logic
    const trainingSection = document.querySelector('#training');
    const trainingCards = document.querySelectorAll('.training-card');
    
    // Create a master timeline for the training cards
    const trainingTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: trainingSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            pin: false
        }
    });

    trainingCards.forEach((card, index) => {
        const content = card.querySelector('.relative.z-30');
        const video = card.querySelector('video');
        
        const startTime = index * 4;

        // Initial states
        gsap.set(card, { opacity: 0, scale: index === 0 ? 1 : 1.1 });
        if (content) gsap.set(content, { y: 60, opacity: 0 });

        // Video Control - Separate ScrollTrigger for robust play/pause
        ScrollTrigger.create({
            trigger: trainingSection,
            start: `top+=${(index * 20)}% top`,
            end: `top+=${((index + 1) * 20)}% top`,
            onEnter: () => {
                card.classList.add('active');
                if (video) video.play().catch(() => {});
            },
            onEnterBack: () => {
                card.classList.add('active');
                if (video) video.play().catch(() => {});
            },
            onLeave: () => {
                card.classList.remove('active');
                if (video) video.pause();
            },
            onLeaveBack: () => {
                card.classList.remove('active');
                if (video) video.pause();
            }
        });

        // Animation Timeline
        trainingTimeline.to(card, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'sine.inOut'
        }, startTime);

        if (content) {
            trainingTimeline.to(content, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }, startTime + 0.5);
        }

        // Fade out for transition
        if (index < trainingCards.length - 1) {
            trainingTimeline.to(card, {
                opacity: 0,
                scale: 1.2,
                duration: 1.5,
                ease: 'sine.inOut'
            }, startTime + 2.5);

            if (content) {
                trainingTimeline.to(content, {
                    y: -60,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.in'
                }, startTime + 2.5);
            }
        }
    });

    // Performance Tunnel - Optimized with single Timeline and Stagger
    const tunnelLayers = document.querySelectorAll('.tunnel-layer');
    const tunnelText = document.querySelector('.tunnel-text');
    const tunnelLight = document.querySelector('.tunnel-light');
    const tunnelRings = document.querySelectorAll('.tunnel-ring');

    const tunnelTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#tunnel',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5, // Unified scrub for better responsiveness
            pin: false
        }
    });

    // Reset initial states for performance
    gsap.set(tunnelRings, { scale: 0.3, opacity: 0 });

    // 1. Entrance Animation (Zoom into the tunnel)
    tunnelTimeline.to(tunnelRings, {
        scale: (i) => 1 + (i * 0.1),
        opacity: (i) => 1 - (i * 0.05),
        rotation: (i) => i % 2 === 0 ? 20 : -20,
        duration: 2,
        stagger: {
            each: 0.05,
            from: "start"
        },
        ease: "power2.out"
    });

    // 2. Text Appearance
    tunnelTimeline.fromTo(tunnelText,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' },
        "-=1.5"
    );

    // 3. Exit Animation (Moving fast through the tunnel)
    tunnelTimeline.to(tunnelRings, {
        scale: (i) => 5 + (i * 1),
        opacity: 0,
        rotation: (i) => i % 2 === 0 ? 60 : -60,
        duration: 2,
        stagger: {
            each: 0.05,
            from: "start"
        },
        ease: "power2.in"
    }, "+=0.5");

    tunnelTimeline.to(tunnelText, {
        scale: 2.5,
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: 'power2.in'
    }, "<");

    // Tunnel light sweep enhancement
    gsap.to(tunnelLight, {
        scrollTrigger: {
            trigger: '#tunnel',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        opacity: 0.6,
        background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.2) 0%, transparent 70%)',
        ease: 'none'
    });

    // Performance Section
    const performanceNumber = document.querySelector('.performance-number');
    const performanceTitle = document.querySelector('.performance-title');
    const performanceDesc = document.querySelector('.performance-desc');
    const performanceBtn = document.querySelector('.performance-btn');

    const perfTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#performance',
            start: 'top 50%',
            end: 'center center',
            scrub: 1
        }
    });

    perfTimeline
        .to(performanceNumber, { opacity: 1, y: 0, duration: 1 })
        .to(performanceTitle, { opacity: 1, scale: 1, y: 0, duration: 1.5 }, '-=0.5')
        .to(performanceDesc, { opacity: 1, y: 0, duration: 1 }, '-=1')
        .to(performanceBtn, { opacity: 1, y: 0, scale: 1, duration: 1 }, '-=0.5');

    // Final CTA Section - Keep visible
    const finalTitle = document.querySelector('.final-title');
    const finalSubtitle = document.querySelector('.final-subtitle');
    const finalCta = document.querySelector('.final-cta');

    // Don't animate final elements - keep them visible
    // const finalTimeline = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '#final',
    //         start: 'top 70%',
    //         end: 'center center',
    //         scrub: 1
    //     }
    // });

    // finalTimeline
    //     .to(finalTitle, {
    //         opacity: 1,
    //         y: 0,
    //         duration: 1
    //     })
    //     .to(finalSubtitle, {
    //         opacity: 1,
    //         y: 0,
    //         duration: 1
    //     }, '-=0.5')
    //     .to(finalCta, {
    //         opacity: 1,
    //         y: 0,
    //         scale: 1,
    //         duration: 1
    //     }, '-=0.5');

    // Set initial states for final section - keep visible
    gsap.set('.final-title', { opacity: 1, y: 0 });
    gsap.set('.final-subtitle', { opacity: 1, y: 0 });
    gsap.set('.final-cta', { opacity: 1, y: 0, scale: 1 });

    // Scroll indicator fade
    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '10% top',
            scrub: 1
        },
        opacity: 0
    });
}

// ============================================
// PARTICLE SYSTEM
// ============================================
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
}

// ============================================
// PERFORMANCE CORE THREE.JS SCENE
// ============================================
function initPerformanceScene() {
    const container = document.getElementById('performance-canvas-container');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Core Geometry - Large Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(2, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x888888,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Inner Core
    const innerGeometry = new THREE.IcosahedronGeometry(1, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Particle Ring
    const ringGeometry = new THREE.TorusGeometry(3.5, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    scene.add(ringMesh);

    // Floating Particles around core
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        const radius = 2.5 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    // Animation
    const clock = new THREE.Clock();

    function animate() {
        const elapsedTime = clock.getElapsedTime();

        coreMesh.rotation.x = elapsedTime * 0.1;
        coreMesh.rotation.y = elapsedTime * 0.15;

        innerMesh.rotation.x = elapsedTime * 0.2;
        innerMesh.rotation.y = elapsedTime * 0.25;

        ringMesh.rotation.z = elapsedTime * 0.05;

        particlesMesh.rotation.y = elapsedTime * 0.05;

        // Pulse effect
        const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
        coreMesh.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    // Scroll-based animation
    gsap.to(coreMesh.scale, {
        scrollTrigger: {
            trigger: '#performance',
            start: 'top bottom',
            end: 'center center',
            scrub: 1
        },
        x: 1.5,
        y: 1.5,
        z: 1.5
    });

    gsap.to(camera.position, {
        scrollTrigger: {
            trigger: '#performance',
            start: 'top bottom',
            end: 'center center',
            scrub: 1
        },
        z: 4
    });

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

console.log('ASCEND PERFORMANCE - Cinematic Experience Initialized');
