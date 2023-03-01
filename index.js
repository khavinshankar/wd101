const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const termsInput = document.getElementById("tac");
const entriesTable = document.getElementById("entries");

const setMinMaxForDob = () => {
  const today = new Date();
  const minDate = new Date(
    `${today.getFullYear() - 55}-${today.getMonth() + 1}-${today.getDate()}`
  )
    .toISOString()
    .slice(0, 10);
  const maxDate = new Date(
    `${today.getFullYear() - 18}-${today.getMonth() + 1}-${today.getDate()}`
  )
    .toISOString()
    .slice(0, 10);

  dobInput.setAttribute("min", minDate);
  dobInput.setAttribute("max", maxDate);
};

const addUserToEntriesTable = (user) => {
  const tableContent = `
        <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
            ${user.name}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${user.email}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${user.password}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${user.dob}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            True
        </td>
    `;
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = tableContent;

  const tableBody = entriesTable.getElementsByTagName("tbody")[0];
  tableBody.appendChild(tableRow);
};

const addUserToLocalStorage = (user) => {
  const users = JSON.parse(localStorage.getItem("users") ?? "[]");
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
};

const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("users") ?? "[]");
};

const populateInitialUsersInEntriesTable = () => {
  const users = getUsersFromLocalStorage();
  users.forEach(addUserToEntriesTable);
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const dob = dobInput.value;
  const user = { name, email, password, dob };
  addUserToLocalStorage(user);
  addUserToEntriesTable(user);
};

setMinMaxForDob();
populateInitialUsersInEntriesTable();