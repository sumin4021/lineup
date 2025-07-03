// 모바일 메뉴 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 모바일 메뉴 링크 클릭 시 메뉴 숨기기
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
});

// 스크롤 시 네비게이션 배경 변경
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scroll');
    } else {
        nav.classList.remove('nav-scroll');
    }
});

// 부드러운 스크롤 효과
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// 스크롤 애니메이션 - 요소가 뷰포트에 나타날 때 애니메이션 실행
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 페이지 로드 시 애니메이션 초기화
document.addEventListener('DOMContentLoaded', animateOnScroll);

// 폼 제출 처리
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // 간단한 유효성 검사
            if (!name || !email || !message) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 성공 메시지 (실제 서버 전송 로직은 백엔드에서 처리)
            alert('메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
            this.reset();
        });
    }
});

// 이메일 유효성 검사 함수
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 카운터 애니메이션 (숫자 카운팅 효과)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// 로딩 효과
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// 스크롤 위치에 따른 네비게이션 활성화
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-600');
        }
    });
});

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
    }
});

// 키보드 네비게이션 지원
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
    }
});

// 페이지 로드 완료 시 실행
window.addEventListener('load', function() {
    // 로딩 완료 후 실행할 코드
    console.log('기업용 웹사이트가 성공적으로 로드되었습니다.');
});