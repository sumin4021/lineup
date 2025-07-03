// index.html 전용 JavaScript 기능들

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

// 스크롤 위치에 따른 네비게이션 활성화
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
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

// 페이지 로드 완료 시 실행
window.addEventListener('load', function() {
    console.log('기업용 웹사이트가 성공적으로 로드되었습니다.');
});