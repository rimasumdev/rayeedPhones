// Function to fetch phones by query
const fetchPhones = async (query = 'iphone') => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${query}`
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch phones:', error);
    return [];
  }
};

// Load initial set of phones (iPhones by default)
const loadPhones = async () => {
  const phones = await fetchPhones();
  displayPhones(phones);
};

// Display phones in the DOM
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  if (!phones.length) {
    dataNotFound(true);
    return;
  }

  dataNotFound(false);

  phones.forEach((phone) => {
    const phoneCard = createPhoneCard(phone);
    phoneContainer.appendChild(phoneCard);
  });

  loadingSpinner(false);
  toggleSearchButton(true);
};

// Create phone card element
const createPhoneCard = (phone) => {
  const phoneCard = document.createElement('div');
  phoneCard.classList =
    'flex flex-col items-center justify-center w-full max-w-sm mx-auto';
  phoneCard.innerHTML = `
      <div class="w-full h-64 bg-white bg-cover rounded-lg shadow-md">
        <img class="object-none object-center w-full h-full" src="${phone.image}" alt="${phone.phone_name}">
      </div>
      <div class="w-full -mt-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 class="pt-5 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          ${phone.phone_name}
        </h3>
        <p class="mt-2 p-5 text-sm text-gray-300 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel.
        </p>
        <div class="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
          <button class="px-3 py-2 w-full text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
            Show Details
          </button>
        </div>
      </div>`;

  return phoneCard;
};

// Search phones by input
const phonesByID = async (searchInput) => {
  const phones = await fetchPhones(searchInput);
  if (phones.length > 12) {
    showAllData = phones;
    toggleClass('show-all-container', 'hidden', false);
  } else {
    showAllData = null;
    toggleClass('show-all-container', 'hidden', true);
  }

  displayPhones(phones.slice(0, 12));
};

// Search function triggered by input
const search = () => {
  const searchInput = document.getElementById('search-input').value.trim();
  if (searchInput) {
    phonesByID(searchInput);
    loadingSpinner(true);
  }
};

// Show all phones
const showAll = () => {
  displayPhones(showAllData);
  toggleClass('show-all-container', 'hidden', true);
};

// Toggle loading spinner
const loadingSpinner = (isLoading) => {
  toggleClass('loading-ring', 'hidden', !isLoading);
};

// Toggle data not found message
const dataNotFound = (isFound) => {
  toggleClass('not-found', 'hidden', !isFound);
};

// Enable/disable the search button based on input
const toggleSearchButton = (disable) => {
  const btnSearch = document.getElementById('search-btn');
  btnSearch.disabled = disable;
};

// Add or remove classes dynamically
const toggleClass = (id, className, shouldAdd) => {
  const element = document.getElementById(id);
  if (element) {
    shouldAdd
      ? element.classList.add(className)
      : element.classList.remove(className);
  }
};

// Initialize event listeners
const enableDisableButton = () => {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => toggleSearchButton(false));
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      search();
      searchInput.blur();
    }
  });
};

// Global variable for storing all data
let showAllData = null;

// Initialize
enableDisableButton();
loadPhones();
