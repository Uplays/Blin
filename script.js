document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Elementos para Animación
    const dynamicElements = document.querySelectorAll('.capa-box, section h2, .hero h1, .hero p, .img-container');

    // Configuramos el estado inicial inmediatamente para evitar saltos visuales
    dynamicElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    // 2. Observer de Revelación (Optimizado para carga rápida)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Dejamos de observar una vez revelado
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    dynamicElements.forEach(el => revealObserver.observe(el));

    // 3. Resaltado de Navegación Activa
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        let current = '';
        const scrollPos = window.pageYOffset + 250;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar al inicio

    // 4. Lógica de Escaneo de Seguridad (Global)
    window.simulateSecurityScan = () => {
        if (document.querySelector('.scan-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'scan-overlay';
        overlay.style.opacity = '0';
        overlay.innerHTML = `
            <div class="scan-modal">
                <h3 style="margin-bottom:1.5rem; text-align:center;">Analizador de Integridad BLIN</h3>
                <div class="scan-bar" style="height:12px; background:#f1f5f9; border-radius:10px; overflow:hidden; border:1px solid #e2e8f0;">
                    <div class="scan-progress" style="height:100%; background:var(--p); width:0; transition: width 0.3s ease;"></div>
                </div>
                <div class="scan-log" style="height:180px; overflow-y:auto; background:#fafafa; padding:1.5rem; border-radius:16px; font-family:monospace; font-size:0.85rem; color:#1e293b; margin-top:1.5rem; border:1px solid #eee;"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Fade in
        requestAnimationFrame(() => overlay.style.opacity = '1');
        overlay.style.transition = 'opacity 0.4s ease';

        const progress = overlay.querySelector('.scan-progress');
        const log = overlay.querySelector('.scan-log');
        const logs = [
            'Inicializando Capa 0...',
            'Verificando permisos de confianza cero...',
            'Cargando protocolos post-cuánticos...',
            'Sincronizando BlinShell...',
            'Analizando caché visual compilada...',
            'Escaneando BridgeOS compatibilidad...',
            'Optimizando recursos de BLIN AI...',
            'SISTEMA INTEGRALMENTE PROTEGIDO'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                const p = document.createElement('p');
                p.style.marginBottom = '0.5rem';
                p.textContent = `[PROCESS] ${logs[i]}`;
                log.appendChild(p);
                log.scrollTop = log.scrollHeight;
                progress.style.width = `${((i + 1) / logs.length) * 100}%`;
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 500);
                    showSystemNotification('Análisis completado: Sistema Seguro');
                }, 1500);
            }
        }, 600);
    };

    function showSystemNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'system-toast';
        toast.innerHTML = `<p><b>BLIN OS:</b> ${message}</p>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = '0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    }
});
