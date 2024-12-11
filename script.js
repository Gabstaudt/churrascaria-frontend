const API_BASE = 'http://localhost:3000/api'; 



// Função de Login
async function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      // token no localStorage
      localStorage.setItem('token', data.token);
      document.getElementById('loginStatus').innerText = 'Login bem-sucedido!';
      document.getElementById('setores').style.display = 'block'; 
    } else {
      document.getElementById('loginStatus').innerText = `Erro: ${data.mensagem}`;
    }
  } catch (error) {
    document.getElementById('loginStatus').innerText = 'Erro ao tentar fazer login.';
    console.error('Erro:', error);
  }
}

// Função para Listar Setores 
async function listarSetores() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Por favor, faça login primeiro.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/setores`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const setores = await response.json();

    if (response.ok) {
      document.getElementById('resultadoSetores').innerText = JSON.stringify(setores, null, 2);
    } else {
      document.getElementById('resultadoSetores').innerText = `Erro: ${setores.mensagem}`;
    }
  } catch (error) {
    console.error('Erro ao listar setores:', error);
    document.getElementById('resultadoSetores').innerText = 'Erro ao tentar listar setores.';
  }
}


async function criarSetor(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeSetor').value;
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('Por favor, faça login primeiro.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/setores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({ nome }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Setor criado: ${JSON.stringify(data)}`);
            listarSetores();
        } else {
            alert(`Erro: ${data.mensagem}`);
        }
    } catch (error) {
        console.error('Erro ao criar setor:', error);
        alert('Erro ao criar setor.');
    }
}

// Funções de Categorias
async function listarCategorias() {
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('Por favor, faça login primeiro.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/categorias`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Categorias:', data);
            document.getElementById('resultadoCategorias').innerText = JSON.stringify(data, null, 2);
        } else {
            alert(`Erro: ${data.mensagem}`);
        }
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
    }
}


async function criarCategoria(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeCategoria').value;
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('Por favor, faça login primeiro.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({ nome }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Categoria criada: ${JSON.stringify(data)}`);
            listarCategorias(); 
        } else {
            alert(`Erro: ${data.mensagem}`);
        }
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        alert('Erro ao criar categoria.');
    }
}


// Funções de Produtos
async function listarProdutos() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Por favor, faça login primeiro.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/produtos`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Produtos:', data);
            document.getElementById('resultadoProdutos').innerText = JSON.stringify(data, null, 2);
        } else {
            alert(`Erro: ${data.mensagem}`);
        }
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
    }
}



async function criarProduto(event) {
    event.preventDefault();

    // Obtendo valores dos campos do formulário
    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const preco_unitario = parseFloat(document.getElementById('precoProduto').value);
    const estoque_inicial = parseInt(document.getElementById('estoqueProduto').value);
    const categoria_id = parseInt(document.getElementById('categoriaProduto').value);
    const setor_id = parseInt(document.getElementById('setorProduto').value) || null; 
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('Por favor, faça login primeiro.');
        return;
    }

    try {
        // Envia os dados para o backend
        const response = await fetch(`${API_BASE}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nome, descricao, preco_unitario, estoque_inicial, categoria_id, setor_id }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Produto criado com sucesso: ${JSON.stringify(data)}`);
            listarProdutos(); 
        } else {
            alert(`Erro: ${data.mensagem}`);
        }
    } catch (error) {
        alert('Erro ao criar produto.');
    }
}


