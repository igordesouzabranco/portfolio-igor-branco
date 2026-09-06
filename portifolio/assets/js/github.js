// ============================================================
// GitHub — Último commit público (seção "Agora")
// ============================================================

const GITHUB_USERNAME = 'igordesouzabranco';
const CACHE_KEY = 'github_recent_commit';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos em milissegundos

// ========== Utilitários de cache ==========

function getCache() {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (Date.now() - data.timestamp > CACHE_TTL) {
            sessionStorage.removeItem(CACHE_KEY);
            return null;
        }
        return data.commit;
    } catch (_) {
        return null;
    }
}

function setCache(commit) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            commit: commit
        }));
    } catch (_) {
        // ignora erro de storage cheio
    }
}

// ========== Formatação de data ==========

function formatShortDate(isoDate) {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
}

// ========== Escape HTML (previne injeção) ==========

function escapeHtml(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
}

// ========== Fetch de dados ==========

async function fetchLatestCommit() {
    // 1. Busca o repo mais recente
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=1`;
    const reposResponse = await fetch(reposUrl);

    if (!reposResponse.ok) {
        throw new Error(`GitHub API (repos): ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();
    if (repos.length === 0) return null;

    const repo = repos[0];

    // 2. Busca o último commit desse repo
    const commitsUrl = `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`;
    const commitsResponse = await fetch(commitsUrl);

    if (!commitsResponse.ok) {
        throw new Error(`GitHub API (commits): ${commitsResponse.status}`);
    }

    const repoCommits = await commitsResponse.json();
    if (repoCommits.length === 0) return null;

    const c = repoCommits[0];

    // 3. Busca o README do repo (primeiras linhas)
    let readme = repo.description || '';
    try {
        const readmeUrl = `https://api.github.com/repos/${repo.full_name}/readme`;
        const readmeResponse = await fetch(readmeUrl);
        if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            // Decodifica de base64 e pega as primeiras linhas
            const decoded = atob(readmeData.content.replace(/\n/g, ''));
            const lines = decoded.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('!'));
            readme = lines.slice(0, 3).join(' ').substring(0, 200).trim();
        }
    } catch (_) {
        // ignora erro de README
    }

    return {
        repo: repo.name,
        repoUrl: repo.html_url,
        message: c.commit.message.split('\n')[0],
        sha: c.sha.substring(0, 7),
        date: c.commit.author.date,
        commitUrl: c.html_url,
        readme: readme || repo.description || 'Sem descrição disponível'
    };
}

// ========== Renderização ==========

function renderCommit(commit) {
    // Atualiza os campos da esquerda
    const repoNameEl = document.getElementById('nowRepoName');
    const commitDateEl = document.getElementById('nowCommitDate');
    const commitShaEl = document.getElementById('nowCommitSha');

    if (repoNameEl) repoNameEl.innerHTML = `<span class="comment">// Repo:</span> <a href="${commit.repoUrl}" target="_blank" rel="noopener noreferrer" class="now-link now-link-repo">${escapeHtml(commit.repo)}</a>`;
    if (commitDateEl) commitDateEl.innerHTML = `<span class="comment">// Data:</span> ${formatShortDate(commit.date)}`;
    if (commitShaEl) commitShaEl.innerHTML = `<span class="comment">// Commit:</span> <a href="${commit.commitUrl}" target="_blank" rel="noopener noreferrer" class="now-link now-link-sha">${escapeHtml(commit.sha)}</a>`;

    // Atualiza o terminal (direita) — repo + mensagem
    const container = document.getElementById('commitsList');
    if (!container) return;

    container.innerHTML = '';

    const entry = document.createElement('div');
    entry.className = 'commit-entry';

    const escapedRepo = escapeHtml(commit.repo);
    const escapedMessage = escapeHtml(commit.message);

    entry.innerHTML = `
        <p class="output"><span class="output-label">repo:</span> <a href="${commit.commitUrl}" target="_blank" rel="noopener noreferrer" class="commit-link" title="${escapedMessage}">${escapedRepo}</a></p>
        <p class="output"><span class="output-label">msg:</span> ${escapedMessage}</p>
    `;

    container.appendChild(entry);
}

function renderError() {
    const container = document.getElementById('commitsList');
    if (container) {
        container.innerHTML = `
            <p class="output" style="color: var(--accent-red);">Erro ao carregar.</p>
            <p class="output"><a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer" class="commit-link">Abrir GitHub</a></p>
        `;
    }

    const repoNameEl = document.getElementById('nowRepoName');
    const commitDateEl = document.getElementById('nowCommitDate');
    const commitShaEl = document.getElementById('nowCommitSha');
    if (repoNameEl) repoNameEl.innerHTML = '<span class="comment">// Repo:</span> erro ao carregar';
    if (commitDateEl) commitDateEl.innerHTML = '<span class="comment">// Data:</span> erro ao carregar';
    if (commitShaEl) commitShaEl.innerHTML = '<span class="comment">// Commit:</span> erro ao carregar';
}

// ========== Carregamento principal ==========

async function loadRecentCommit() {
    const container = document.getElementById('commitsList');
    if (!container) return;

    // Tenta cache primeiro
    const cached = getCache();
    if (cached) {
        renderCommit(cached);
        return;
    }

    try {
        const commit = await fetchLatestCommit();
        if (commit) {
            setCache(commit);
            renderCommit(commit);
        } else {
            renderError();
        }
    } catch (_) {
        renderError();
    }
}

loadRecentCommit();
