const bgMusic = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');

toggleBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        toggleBtn.textContent = '🔊'; // biểu tượng loa mở
    } else {
        bgMusic.pause();
        toggleBtn.textContent = '🔇'; // biểu tượng tắt loa
    }
});

// Tự phát khi load trang (nếu trình duyệt cho phép)
window.addEventListener('load', () => {
    bgMusic.volume = 0.5;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Nếu bị chặn, nhạc sẽ bật khi user click nút loa
            console.log("Autoplay bị chặn, nhấn nút loa để bật nhạc");
        });
    }
});



// Three.js 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Create colorful particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;
    
    colorArray[i] = Math.random();
    colorArray[i + 1] = Math.random();
    colorArray[i + 2] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
   size: 0.7,
    color: 0x00aaff,
    transparent: true,
    opacity: 0.7
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animate particles
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate3D() {
    requestAnimationFrame(animate3D);
    
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.002;
    
    particlesMesh.rotation.x += mouseY * 0.01;
    particlesMesh.rotation.y += mouseX * 0.01;
    
    renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Custom Cursor with Trail
const cursor = document.querySelector('.cursor');
let trails = [];

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Create trail
    if (Math.random() > 0.8) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.textContent = '🐸';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Click Pepe for explosion
document.querySelectorAll('.pepe-float').forEach(pepe => {
    pepe.addEventListener('click', (e) => {
        const emojis = ['🎉', '🎊', '🎈', '🎁', '⭐', '✨', '💫', '🎂', '🍰'];
        
        for (let i = 0; i < 20; i++) {
            const explosion = document.createElement('div');
            explosion.className = 'emoji-explosion';
            explosion.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            explosion.style.left = e.clientX + 'px';
            explosion.style.top = e.clientY + 'px';
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 200 + Math.random() * 100;
            explosion.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            explosion.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(explosion);
            setTimeout(() => explosion.remove(), 2000);
        }
        
        // Sound effect (visual feedback)
        gsap.to(pepe, {
            scale: 2,
            rotation: 720,
            duration: 0.5,
            ease: 'back.out',
            onComplete: () => {
                gsap.to(pepe, { scale: 1, rotation: 0, duration: 0.3 });
            }
        });
    });
});

// Confetti rain
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
}

setInterval(createConfetti, 200);

// Disco lights
for (let i = 0; i < 3; i++) {
    const light = document.createElement('div');
    light.className = 'disco-light';
    light.style.left = Math.random() * 100 + '%';
    light.style.top = Math.random() * 100 + '%';
    light.style.animationDelay = i * 1 + 's';
    document.body.appendChild(light);
}

// ScrollTrigger animations
gsap.from('.hero-title', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    scale: 0.5,
    opacity: 0,
    duration: 1
});

gsap.from('.card-3d', {
    scrollTrigger: {
        trigger: '#message',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    rotateY: 180,
    opacity: 0,
    scale: 0.5,
    duration: 1
});

gsap.from('.cake-big', {
    scrollTrigger: {
        trigger: '#cake',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    scale: 0,
    rotation: -360,
    duration: 1
});

// Auto scroll hint
setTimeout(() => {
    gsap.to(window, {
        scrollTo: { y: window.innerHeight * 0.3 },
        duration: 2,
        ease: 'power2.inOut'
    });
}, 3000);

// Parallax effect on Pepe
document.querySelectorAll('.pepe-float').forEach(pepe => {
    gsap.to(pepe, {
        scrollTrigger: {
            trigger: pepe.parentElement,
            scrub: 2
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed || -200,
        ease: 'none'
    });
});

// Speech bubble interaction
document.querySelectorAll('.speech-bubble').forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
        gsap.to(bubble, {
            scale: 1.15,
            duration: 0.3,
            ease: 'back.out'
        });
    });
    
    bubble.addEventListener('mouseleave', () => {
        gsap.to(bubble, {
            scale: 1,
            duration: 0.3
        });
    });
});

// Random Pepe sounds (visual)
setInterval(() => {
    const pepes = document.querySelectorAll('.pepe-float');
    const randomPepe = pepes[Math.floor(Math.random() * pepes.length)];
    
    gsap.to(randomPepe, {
        scale: 1.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
}, 2000);

// === Gift Box Animation ===
const giftBox = document.getElementById("giftBox");
const giftContent = document.getElementById("giftContent");
let giftOpened = false;

giftBox.addEventListener("click", () => {
  if (!giftOpened) {
    giftOpened = true;

    // Tắt animation rung
    giftBox.style.animation = "none";

    // Hiệu ứng mở hộp
    gsap.to(giftBox, {
      scale: 1.3,
      rotation: 20,
      duration: 0.4,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Biến mất hộp quà
        gsap.to(giftBox, {
          scale: 0,
          rotation: 720,
          opacity: 0,
          duration: 1,
          ease: "back.in(2)",
          onComplete: () => {
            giftBox.style.display = "none";
            giftContent.style.display = "block";

            // Hiện cây và hướng dẫn
            gsap.to(giftContent, {
              opacity: 1,
              y: -20,
              duration: 1.2,
              ease: "power2.out"
            });
          }
        });
      }
    });
  }
});

const letterIcon = document.getElementById('letter-icon');
const letterPopup = document.getElementById('letter-popup');
const letterClose = document.querySelector('.letter-close');

// Mở lá thư
letterIcon.addEventListener('click', () => {
    letterPopup.style.display = 'flex';
});

// Đóng lá thư
letterClose.addEventListener('click', () => {
    letterPopup.style.display = 'none';
});

letterPopup.addEventListener('click', (e) => {
    if (e.target === letterPopup) {
        letterPopup.style.display = 'none';
    }
});
