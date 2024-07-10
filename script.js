document.addEventListener('DOMContentLoaded', () => {
    listarPacientes();
});

function getPacientes() {
    return JSON.parse(localStorage.getItem('pacientes')) || [];
}

function savePacientes(pacientes) {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}

function cadastrarPaciente() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value;
    const sexo = document.getElementById('sexo').value;
    const endereco = document.getElementById('endereco').value;
    const status = document.getElementById('status').value;

    if (!nome || !dataNascimento || !cpf || !sexo || !status) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const pacientes = getPacientes();

    if (pacientes.some(paciente => paciente.cpf === cpf)) {
        alert('CPF já cadastrado.');
        return;
    }

    const novoPaciente = {
        id: Date.now(),
        nome,
        dataNascimento,
        cpf,
        sexo,
        endereco,
        status
    };

    pacientes.push(novoPaciente);
    savePacientes(pacientes);
    listarPacientes();
    limparFormulario(); // Esvaziar o formulário após cadastrar o paciente
}

function listarPacientes() {
    const pacientes = getPacientes();
    const filterNome = document.getElementById('filterNome').value.toLowerCase();
    const listaPacientes = document.getElementById('listaPacientes');

    listaPacientes.innerHTML = '';

    pacientes
        .filter(paciente => paciente.nome.toLowerCase().includes(filterNome))
        .forEach(paciente => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nome:</strong> ${paciente.nome}<br>
                <strong>Data de Nascimento:</strong> ${paciente.dataNascimento}<br>
                <strong>CPF:</strong> ${paciente.cpf}<br>
                <strong>Sexo:</strong> ${paciente.sexo}<br>
                <strong>Endereço:</strong> ${paciente.endereco}<br>
                <strong>Status:</strong> ${paciente.status}<br>
                <button onclick="editarPaciente(${paciente.id})">Editar</button>
                <button onclick="inativarPaciente(${paciente.id})">Inativar</button>
            `;
            listaPacientes.appendChild(li);
        });
}

function editarPaciente(id) {
    const pacientes = getPacientes();
    const paciente = pacientes.find(p => p.id === id);

    if (!paciente) {
        alert('Paciente não encontrado.');
        return;
    }

    document.getElementById('nome').value = paciente.nome;
    document.getElementById('dataNascimento').value = paciente.dataNascimento;
    document.getElementById('cpf').value = paciente.cpf;
    document.getElementById('sexo').value = paciente.sexo;
    document.getElementById('endereco').value = paciente.endereco;
    document.getElementById('status').value = paciente.status;

    inativarPaciente(id);
}

function inativarPaciente(id) {
    const pacientes = getPacientes();
    const index = pacientes.findIndex(p => p.id === id);

    if (index === -1) {
        alert('Paciente não encontrado.');
        return;
    }

    pacientes[index].status = 'Inativo';
    savePacientes(pacientes);
    listarPacientes();
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('status').value = '';
}
