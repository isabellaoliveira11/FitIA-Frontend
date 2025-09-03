document.addEventListener("DOMContentLoaded", () => {
    // Mobile sidebar toggle
    const toggleBtn = document.getElementById("sidebar-toggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const sidebar = document.querySelector("aside");
            sidebar.classList.toggle("sidebar-collapsed");
            sidebar.classList.toggle("sidebar-expanded");
        });
    }

    // Collapsible menus
    document.querySelectorAll('nav button[aria-expanded]').forEach(button => {
        button.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);

            const icon = this.querySelector('i:last-child');
            if (icon) icon.classList.toggle('rotate-180');

            const submenu = document.querySelector(`ul[data-submenu="${this.dataset.section}"]`);
            if (submenu) submenu.classList.toggle('hidden');
        });
    });

    // Active link based on current file name
    const path = window.location.pathname.split("/").pop() || "index.html"; // Garante que a raiz do site funcione
    const map = {
        "index.html": "dashboard",
        "students.html": "students-list",
        "students-risk.html": "students-risk",
        "students-comms.html": "students-comms",
        "finance-cash.html": "finance-cash",
        "finance-expenses.html": "finance-expenses",
        "finance-payments.html": "finance-payments",
        "finance-plans.html": "finance-plans",
        "finance-discounts.html": "finance-discounts",
        "trainings.html": "trainings",
        "reports.html": "reports",
        "settings.html": "settings",
        "assistant.html": "assistant"
    };
    
    const activeKey = map[path] || "dashboard";
    const activeLink = document.querySelector(`[data-nav="${activeKey}"]`);
    
    if (activeLink) {
        // AJUSTE: Removida a classe "text-white", pois "active-menu-item" já cuida disso.
        activeLink.classList.add("active-menu-item", "font-bold");

        // Expand parent section if inside submenu
        const parentSubmenu = activeLink.closest("[data-submenu]");
        if (parentSubmenu) {
            parentSubmenu.classList.remove("hidden");
            const section = parentSubmenu.getAttribute("data-submenu");
            const btn = document.querySelector(`button[data-section="${section}"]`);
            if (btn) {
                btn.setAttribute("aria-expanded", "true");
                
                // MELHORIA: Gira o ícone do menu pai para refletir o estado aberto.
                const icon = btn.querySelector('i:last-child');
                if (icon) icon.classList.add('rotate-180');
            }
        }
    }
});