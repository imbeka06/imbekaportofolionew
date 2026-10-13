(function () {
    'use strict';

    const config = window.SANITY_CONFIG || {};
    const isConfigured = Boolean(config.projectId && config.dataset);

    if (!isConfigured) {
        console.info('Sanity is not configured; using the portfolio content included in index.html.');
        return;
    }

    const apiVersion = config.apiVersion || '2025-01-01';
    const host = config.useCdn === false ? 'api' : 'apicdn';
    const endpoint = `https://${config.projectId}.${host}.sanity.io/v${apiVersion}/data/query/${config.dataset}`;
    const query = `{
        "settings": *[_type == "siteSettings"][0]{name, professionalTagline, developerTagline, about, email, phone, githubUrl, linkedinUrl, instagramUrl},
        "projects": *[_type == "project"] | order(order asc){_id, title, technologies, description, githubUrl, liveUrl, featured},
        "photos": *[_type == "photo"] | order(order asc){_id, caption, alt, "imageUrl": image.asset->url},
        "posts": *[_type == "post"] | order(publishedAt desc){_id, title, slug, excerpt, publishedAt, body[]{..., children[]{...}}},
        "experiences": *[_type == "experience"] | order(order asc){_id, title, company, startDate, endDate, highlights},
        "educations": *[_type == "education"] | order(order asc){_id, degree, institution, startDate, endDate, notes},
        "certifications": *[_type == "certification"] | order(order asc){_id, name, issuer, date, credentialUrl},
        "skillCategories": *[_type == "skillCategory"] | order(order asc){_id, title, skills, group}
    }`;

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);

    const safeUrl = (value) => {
        if (!value) return '';
        try {
            const url = new URL(value, window.location.href);
            return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : '';
        } catch (_error) {
            return '';
        }
    };

    function renderProjects(projects) {
        if (!Array.isArray(projects) || projects.length === 0) return;
        const cards = projects.map((project) => {
            const technologies = Array.isArray(project.technologies)
                ? project.technologies.join(', ')
                : project.technologies || '';
            const githubUrl = safeUrl(project.githubUrl);
            const liveUrl = safeUrl(project.liveUrl);
            return `<div class="project-card"><div class="project-content">
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <p class="project-tech">${escapeHtml(technologies)}</p>
                <p class="project-description">${escapeHtml(project.description)}</p>
                ${githubUrl ? `<a href="${escapeHtml(githubUrl)}" target="_blank" rel="noopener noreferrer" class="contact-btn" style="padding: 8px 15px; font-size: 0.9rem;"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
                ${liveUrl ? `<a href="${escapeHtml(liveUrl)}" target="_blank" rel="noopener noreferrer" class="contact-btn" style="padding: 8px 15px; font-size: 0.9rem; margin-top: 8px; background: #1a7a4a; border-color: #1a7a4a;"><i class="fas fa-external-link-alt"></i> View Live Project</a>` : ''}
            </div></div>`;
        }).join('');

        document.querySelectorAll('[data-cms-projects]').forEach((container) => {
            container.innerHTML = cards;
        });
    }

    function renderPhotos(photos) {
        if (!Array.isArray(photos) || photos.length === 0) return;
        const gallery = photos.map((photo) => {
            const imageUrl = safeUrl(photo.imageUrl);
            if (!imageUrl) return '';
            return `<div class="gallery-item">
                <img src="${escapeHtml(imageUrl)}?auto=format&w=900" alt="${escapeHtml(photo.alt || photo.caption || 'Portfolio photograph')}" loading="lazy">
                <div class="gallery-caption">${escapeHtml(photo.caption || '')}</div>
            </div>`;
        }).join('');
        if (!gallery) return;

        document.querySelectorAll('[data-cms-photos]').forEach((container) => {
            container.innerHTML = gallery;
        });
    }

    function portableTextToHtml(blocks) {
        if (!Array.isArray(blocks)) return '';
        return blocks.map((block) => {
            if (block._type !== 'block' || !Array.isArray(block.children)) return '';
            const text = block.children.map((child) => escapeHtml(child.text)).join('');
            if (!text) return '';
            if (/^h[2-4]$/.test(block.style)) return `<${block.style}>${text}</${block.style}>`;
            return `<p>${text}</p>`;
        }).join('');
    }

    function renderPosts(posts) {
        if (!Array.isArray(posts) || posts.length === 0) return;
        const list = document.querySelector('[data-cms-post-list]');
        const host = document.querySelector('[data-cms-post-host]');
        if (!list || !host) return;

        list.innerHTML = posts.map((post, index) => `<button type="button" class="blog-card cms-blog-card" data-cms-post-index="${index}">
            <div class="blog-content">
                <h3 class="blog-title">${escapeHtml(post.title)}</h3>
                <p class="blog-excerpt">${escapeHtml(post.excerpt || '')}</p>
            </div>
        </button>`).join('');

        list.addEventListener('click', (event) => {
            const card = event.target.closest('[data-cms-post-index]');
            if (!card) return;
            const post = posts[Number(card.dataset.cmsPostIndex)];
            if (!post) return;
            host.querySelector('[data-cms-post-title]').textContent = post.title || 'Blog post';
            host.querySelector('[data-cms-post-body]').innerHTML = portableTextToHtml(post.body);
            showView('cms-post');
        });
    }

    function renderSettings(settings) {
        if (!settings) return;
        document.querySelectorAll('[data-cms-name]').forEach((element) => {
            if (settings.name) element.textContent = settings.name;
        });
        document.querySelectorAll('[data-cms-professional-tagline]').forEach((element) => {
            if (settings.professionalTagline) element.textContent = settings.professionalTagline;
        });
        document.querySelectorAll('[data-cms-developer-tagline]').forEach((element) => {
            if (settings.developerTagline) element.textContent = settings.developerTagline;
        });
        const about = document.querySelector('[data-cms-about]');
        if (about && settings.about) about.textContent = settings.about;
    }

    function renderExperiences(experiences) {
        if (!Array.isArray(experiences) || experiences.length === 0) return;
        const items = experiences.map((exp) => {
            const duration = [exp.startDate, exp.endDate || 'Present'].filter(Boolean).join(' - ');
            const highlights = Array.isArray(exp.highlights) && exp.highlights.length
                ? `<ul>${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul>`
                : '';
            return `<div class="experience-item">
                <h3 class="item-title">${escapeHtml(exp.title)}</h3>
                ${exp.company ? `<p class="item-subtitle">${escapeHtml(exp.company)}</p>` : ''}
                ${duration ? `<p class="item-duration">${escapeHtml(duration)}</p>` : ''}
                ${highlights}
            </div>`;
        }).join('');
        document.querySelectorAll('[data-cms-experiences]').forEach((container) => {
            container.innerHTML = items;
        });
    }

    function renderEducations(educations) {
        if (!Array.isArray(educations) || educations.length === 0) return;
        const items = educations.map((edu) => {
            const duration = [edu.startDate, edu.endDate || 'Present'].filter(Boolean).join(' - ');
            return `<div class="education-item">
                <h3 class="item-title">${escapeHtml(edu.degree)}</h3>
                ${edu.institution ? `<p class="item-subtitle">${escapeHtml(edu.institution)}</p>` : ''}
                ${duration ? `<p class="item-duration">${escapeHtml(duration)}</p>` : ''}
                ${edu.notes ? `<p>${escapeHtml(edu.notes)}</p>` : ''}
            </div>`;
        }).join('');
        document.querySelectorAll('[data-cms-educations]').forEach((container) => {
            container.innerHTML = items;
        });
    }

    function renderCertifications(certifications) {
        const section = document.querySelector('[data-cms-certifications-section]');
        if (!section) return;
        if (!Array.isArray(certifications) || certifications.length === 0) return;
        const cards = certifications.map((cert) => {
            const credentialUrl = safeUrl(cert.credentialUrl);
            return `<div class="fact-card">
                <h3 class="category-title">${escapeHtml(cert.name)}</h3>
                ${cert.issuer ? `<p>${escapeHtml(cert.issuer)}</p>` : ''}
                ${cert.date ? `<p class="item-duration">${escapeHtml(cert.date)}</p>` : ''}
                ${credentialUrl ? `<a href="${escapeHtml(credentialUrl)}" target="_blank" rel="noopener noreferrer" class="contact-btn" style="padding: 8px 15px; font-size: 0.9rem; margin-top: 10px;"><i class="fas fa-award"></i> View Credential</a>` : ''}
            </div>`;
        }).join('');
        const list = document.querySelector('[data-cms-certifications]');
        if (list) list.innerHTML = cards;
        section.style.display = '';
    }

    function renderSkills(skillCategories) {
        if (!Array.isArray(skillCategories) || skillCategories.length === 0) return;
        document.querySelectorAll('[data-cms-skills]').forEach((container) => {
            const group = container.getAttribute('data-cms-skills');
            const items = skillCategories.filter((cat) => cat.group === group);
            if (items.length === 0) return;
            container.innerHTML = items.map((cat) => {
                const skills = Array.isArray(cat.skills) ? cat.skills.join(', ') : '';
                return `<div class="skill-category">
                    <h3 class="category-title">${escapeHtml(cat.title)}</h3>
                    <p>${escapeHtml(skills)}</p>
                </div>`;
            }).join('');
        });
    }

    async function loadContent() {
        try {
            const response = await fetch(`${endpoint}?query=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`Sanity returned HTTP ${response.status}`);
            const payload = await response.json();
            if (!payload.result) throw new Error('Sanity returned no content result.');
            renderSettings(payload.result.settings);
            renderProjects(payload.result.projects);
            renderPhotos(payload.result.photos);
            renderPosts(payload.result.posts);
            renderExperiences(payload.result.experiences);
            renderEducations(payload.result.educations);
            renderCertifications(payload.result.certifications);
            renderSkills(payload.result.skillCategories);
            document.documentElement.dataset.cms = 'sanity';
        } catch (error) {
            console.warn('Could not load Sanity content; keeping built-in portfolio content.', error);
        }
    }

    document.addEventListener('DOMContentLoaded', loadContent);
}());
