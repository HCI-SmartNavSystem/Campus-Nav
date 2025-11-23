        const routeDetails = {
            "Shortest Route": { icon: "🚶", distance: "0.3 km", time: "4 min", steps: [{ title: "Head north on Main Path", desc: "150m" }, { title: "Turn right at the Library", desc: "50m" }, { title: "Cut through the courtyard", desc: "100m" }] },
            "Accessible Route": { icon: "♿", distance: "0.4 km", time: "6 min", steps: [{ title: "Head north on Main Path", desc: "150m" }, { title: "Use ramp on the left", desc: "30m" }, { title: "Turn right at the fountain", desc: "80m - Wide path" }] },
            "Shaded Path": { icon: "🌳", distance: "0.5 km", time: "7 min", steps: [{ title: "Head east towards Gardens", desc: "200m" }, { title: "Follow the tree-lined walkway", desc: "250m" }, { title: "Turn left at Admin Block", desc: "50m" }] }
        };
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }
        document.addEventListener('DOMContentLoaded', () => {
            const destination = getQueryParam('destination') || 'Labs';
            const routeType = getQueryParam('route') || 'Shortest Route';
            document.querySelector('.dest-name').textContent = destination;
            document.querySelector('.route-name').textContent = routeType;
            const currentRouteData = routeDetails[routeType] || routeDetails["Shortest Route"];
            const statChips = document.querySelectorAll('.stat-chip');
            if (statChips.length >= 2) {
                statChips[0].innerHTML = `<span class="stat-icon">${currentRouteData.icon}</span> ${currentRouteData.distance}`;
                statChips[1].innerHTML = `<span class="stat-icon">⏱</span> ${currentRouteData.time}`;
            }
            const stepListContainer = document.querySelector('.step-list');
            if (stepListContainer) {
                stepListContainer.innerHTML = '';
                currentRouteData.steps.forEach((step, index) => {
                    const stepHTML = `<div class="step-item"><div class="step-indicator-container"><div class="step-circle">${index + 1}</div><div class="step-line"></div></div><div class="step-content"><div class="step-title">${step.title}</div><div class="step-desc">${step.desc}</div></div></div>`;
                    stepListContainer.insertAdjacentHTML('beforeend', stepHTML);
                });
                const finalStepHTML = `<div class="step-item"><div class="step-indicator-container"><div class="step-circle finish">✓</div></div><div class="step-content"><div class="step-title">Arrive at ${destination}</div><div class="step-desc">Main entrance</div></div></div>`;
                stepListContainer.insertAdjacentHTML('beforeend', finalStepHTML);
            }
            const backLink = document.querySelector('.back-button');
            if (backLink) backLink.href = `start_nav.html?destination=${encodeURIComponent(destination)}`;
            document.getElementById('start-nav-btn').addEventListener('click', function() {
                const originalText = this.innerHTML;
                this.innerHTML = "<span>Starting...</span>";
                setTimeout(() => {
                    window.location.href = `nav_map.html?destination=${encodeURIComponent(destination)}`;
                }, 1000);
            });
        });