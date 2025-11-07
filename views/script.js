const form = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalExpensesElement = document.getElementById('totalExpenses');
const btnSubmit = document.getElementById('btnSubmit');

async function fetchTotalExpenses() {
    try {
        const response = await fetch('/api/expenses/total');
        const data = await response.json();
        totalExpensesElement.innerText = `Total das Despesas: R$${data.totalAmount.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao buscar o total das despesas:', error);
    }
}

async function fetchExpenses() {
    const response = await fetch('/api/expenses');
    const expenses = await response.json();
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const dateFormatted = new Date(expense.date).toLocaleDateString('pt-BR');
        const div = document.createElement('div');
        div.className = 'expense-item';
        div.innerHTML = `
            <span>${expense.description} - R$${expense.amount.toFixed(2)} - ${dateFormatted}</span>
            <div>
                <button class="btn-alterar" onclick="editExpense('${expense._id}', '${expense.description}', ${expense.amount}, '${expense.date}')">Alterar</button>
                <button class="btn-excluir" onclick="deleteExpense('${expense._id}')">Excluir</button>
            </div>
        `;
        expenseList.appendChild(div);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('expenseId').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    const expenseData = { description, amount, date };
    let url = '/api/expenses';
    let method = 'POST';

    if (id) {
        url += `/${id}`;
        method = 'PUT';
    }

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
    });

    form.reset();
    document.getElementById('expenseId').value = '';
    btnSubmit.innerText = 'Cadastrar Despesa';
    btnSubmit.style.backgroundColor = '#28a745';

    updateUI();
});

window.editExpense = (id, description, amount, date) => {
    document.getElementById('expenseId').value = id;
    document.getElementById('description').value = description;
    document.getElementById('amount').value = amount;
    document.getElementById('date').value = date.split('T')[0];
    btnSubmit.innerText = 'Atualizar Despesa';
    btnSubmit.style.backgroundColor = '#007bff';
};

window.deleteExpense = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        updateUI();
    }
};

function updateUI() {
    fetchExpenses();
    fetchTotalExpenses();
}

window.addEventListener('DOMContentLoaded', () => {
    updateUI();
});