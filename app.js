"use strict";
class PostManager {
    baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    uiOutput = null;
    consoleOutput = null;
    constructor() {
        // Solo intentamos capturar el HTML si estamos en el navegador
        if (typeof document !== 'undefined') {
            this.uiOutput = document.getElementById('ui-output');
            this.consoleOutput = document.getElementById('console-output');
        }
    }
    log(actionMessage, data) {
        // Esto siempre se ejecutará (Tanto en Node.js como en Navegador)
        console.log(`\n[LOG]: ${actionMessage}`);
        if (data) {
            if (typeof console.table === 'function' && Array.isArray(data)) {
                console.table(data.slice(0, 3)); // Muestra pequeña en tabla
            }
            else {
                console.log(JSON.stringify(data, null, 2));
            }
        }
        // Esto solo se ejecuta si estamos en el navegador y el elemento existe
        if (this.consoleOutput) {
            const timestamp = new Date().toLocaleTimeString();
            let formattedLog = `> [${timestamp}] ${actionMessage}\n`;
            if (data) {
                formattedLog += `${JSON.stringify(data, null, 2)}\n`;
            }
            this.consoleOutput.innerText += formattedLog + '\n';
            this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
        }
    }
    handleError(contextMessage, error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`[ERROR]: ${contextMessage} ->`, errorMsg);
        if (this.consoleOutput) {
            const timestamp = new Date().toLocaleTimeString();
            this.consoleOutput.innerHTML += `<span class="log-error">> [${timestamp}] ERROR: ${contextMessage} (${errorMsg})</span>\n\n`;
        }
        if (this.uiOutput) {
            this.uiOutput.innerHTML = `
                <div class="post-card" style="border-left-color: #e53e3e; background: #fff5f5;">
                    <h3 style="color: #e53e3e;">⚠️ Error</h3>
                    <p>${contextMessage}</p>
                </div>
            `;
        }
    }
    renderUi(posts) {
        // 1. Creamos una copia local. TypeScript no perderá el tipo de una variable local.
        const container = this.uiOutput;
        if (!container)
            return;
        // A partir de aquí usamos 'container' en lugar de 'this.uiOutput'
        container.innerHTML = '';
        const dataArray = Array.isArray(posts) ? posts : [posts];
        if (dataArray.length === 0) {
            container.innerHTML = '<p class="placeholder-text">No hay resultados.</p>';
            return;
        }
        dataArray.slice(0, 5).forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="post-meta">
                <span><strong>ID:</strong> ${post.id}</span>
                <span><strong>User:</strong> ${post.userId}</span>
            </div>
        `;
            // Usamos la variable local que TypeScript ya sabe que es 100% segura
            container.appendChild(card);
        });
    }
    // ==========================================
    // MÉTODOS DE LA API REST (Compatibles con ambos)
    // ==========================================
    async getAllPosts() {
        this.log('Iniciando: GET /posts');
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const posts = await response.json();
            this.log(`Éxito. Obtenidos ${posts.length} posts.`, posts);
            this.renderUi(posts);
        }
        catch (error) {
            this.handleError('Error en GET ALL', error);
        }
    }
    async getPostById(id) {
        this.log(`Iniciando: GET /posts/${id}`);
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const post = await response.json();
            this.log('Post recuperado:', post);
            this.renderUi(post);
        }
        catch (error) {
            this.handleError(`Error en GET por ID ${id}`, error);
        }
    }
    async getPostsByUserId(userId) {
        this.log(`Iniciando: GET /posts?userId=${userId}`);
        try {
            const response = await fetch(`${this.baseUrl}?userId=${userId}`);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const posts = await response.json();
            this.log(`Posts del usuario ${userId}:`, posts);
            this.renderUi(posts);
        }
        catch (error) {
            this.handleError('Error en Filtro', error);
        }
    }
    async createPost(title, body, userId) {
        this.log('Iniciando: POST /posts');
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                body: JSON.stringify({ title, body, userId }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const created = await response.json();
            this.log('Creado con éxito:', created);
            if (this.uiOutput) {
                this.uiOutput.innerHTML = `<div class="post-card card-success"><h3>✓ Creado (POST)</h3><p>${created.title}</p></div>`;
            }
        }
        catch (error) {
            this.handleError('Error en POST', error);
        }
    }
    async updatePostTitle(id, newTitle) {
        this.log(`Iniciando: PATCH /posts/${id}`);
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ title: newTitle }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const patched = await response.json();
            this.log('Actualizado parcial (PATCH):', patched);
            if (this.uiOutput) {
                this.uiOutput.innerHTML = `<div class="post-card card-success"><h3>✓ Actualizado (PATCH)</h3><p>${patched.title}</p></div>`;
            }
        }
        catch (error) {
            this.handleError('Error en PATCH', error);
        }
    }
    async deletePost(id) {
        this.log(`Iniciando: DELETE /posts/${id}`);
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            this.log(`Eliminado con éxito (DELETE). Respuesta del servidor:`, result);
            if (this.uiOutput) {
                this.uiOutput.innerHTML = `<div class="post-card card-success"><h3>🗑️ Eliminado (DELETE) ID: ${id}</h3></div>`;
            }
        }
        catch (error) {
            this.handleError('Error en DELETE', error);
        }
    }
}
// ==========================================
// CONTROL DE ENTORNOS DE EJECUCIÓN
// ==========================================
if (typeof document !== 'undefined') {
    // ---- ENTORNO NAVEGADOR (PÁGINA WEB) ----
    document.addEventListener('DOMContentLoaded', () => {
        const manager = new PostManager();
        document.getElementById('btn-get-all')?.addEventListener('click', () => manager.getAllPosts());
        document.getElementById('form-get-id')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('input-id').value;
            manager.getPostById(parseInt(val));
        });
        document.getElementById('form-filter-user')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('input-user-id').value;
            manager.getPostsByUserId(parseInt(val));
        });
        document.getElementById('form-create')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const uId = parseInt(document.getElementById('create-user').value);
            const t = document.getElementById('create-title').value;
            const b = document.getElementById('create-body').value;
            manager.createPost(t, b, uId);
            e.target.reset();
        });
        document.getElementById('form-patch')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = parseInt(document.getElementById('patch-id').value);
            const t = document.getElementById('patch-title').value;
            manager.updatePostTitle(id, t);
            e.target.reset();
        });
        document.getElementById('form-delete')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('delete-id').value;
            manager.deletePost(parseInt(val));
            e.target.reset();
        });
    });
}
else {
    // ---- ENTORNO CONSOLA (NODE.JS) ----
    // Ejecuta una secuencia automática de prueba al escribir "node app.js"
    (async () => {
        console.log("=== EJECUTANDO PRUEBAS EN CONSOLA (NODE.JS) ===");
        const manager = new PostManager();
        // Ejecutamos las operaciones solicitadas secuencialmente
        await manager.getPostById(1);
        await manager.createPost("Nuevo post desde terminal", "Contenido exclusivo de consola Node", 5);
        await manager.updatePostTitle(1, "Título cambiado en Node");
        await manager.deletePost(1);
        console.log("\n=== FIN DE LAS PRUEBAS EN CONSOLA ===");
    })();
}
