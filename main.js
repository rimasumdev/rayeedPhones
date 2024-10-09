const loadPhones = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/phones?search=iphone'
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  phones.forEach((phone) => {
    const phoneCard = document.createElement('div');
    phoneCard.classList =
      'flex flex-col items-center justify-center w-full max-w-sm mx-auto';
    phoneCard.innerHTML = `
        <div
            class="w-full h-64 bg-white bg-cover rounded-lg shadow-md"

          ><img class="object-none object-center w-full h-full" src="${phone.image}">
          </div>

          <div
            class="w-full -mt-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            <h3
              class="pt-5 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white"
            >
              ${phone.phone_name}
            </h3>

            
            <p class="mt-2 p-5 text-sm text-gray-300 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
              parturient et sem ipsum volutpat vel. Natoque sem et aliquam
              mauris egestas quam volutpat viverra. In pretium nec senectus
              erat. Et malesuada lobortis.
            </p>
            <div
              class="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700"
            >
              <span class="font-bold text-gray-800 dark:text-gray-200"
                ></span
              >
              <button onclick="showDetailsButton('${phone.slug}', phoneDetails.showModal())"
                class="px-3 py-2 w-full text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
              >
                Show Details
              </button>
            </div>
          </div>
      `;
    phoneContainer.appendChild(phoneCard);
  });
  loadingSpinner(false);
  const btnSearch = document.getElementById('search-btn');
  btnSearch.setAttribute('disabled', true);
};

const phonesByID = async (searchInput) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInput}`
  );
  const data = await res.json();
  const phones = data.data;
  if (phones.length > 12) {
    removeClass('show-all-container', 'hidden');
    showAllData = phones;
  } else {
    addClass('show-all-container', 'hidden');
    showAllData = null;
  }
  if (phones.length) {
    dataNotFound(false);
  } else {
    dataNotFound(true);
  }
  const showingPhones = phones.slice(0, 12);
  displayPhone(showingPhones);
};

const search = () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    phonesByID(searchInput.value);
    searchInput.value = '';
    loadingSpinner(true);
  } else {
    searchInput.focus();
  }
};

const loadingSpinner = (isLoading) => {
  if (isLoading) {
    removeClass('loading-ring', 'hidden');
  } else {
    addClass('loading-ring', 'hidden');
  }
};

const dataNotFound = (isFound) => {
  if (isFound) {
    removeClass('not-found', 'hidden');
  } else {
    addClass('not-found', 'hidden');
  }
};

const enableDisableButton = () => {
  const btnSearch = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
      btnSearch.setAttribute('disabled', '');
    } else {
      btnSearch.removeAttribute('disabled');
    }
  });
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      search();
      const searchInput = document.getElementById('search-input');
      searchInput.blur();
    }
  });
};

let showAllData = null;
const showAll = () => {
  displayPhone(showAllData);
  addClass('show-all-container', 'hidden');
  console.log('show all', showAllData);
};

const addClass = (id, className) => {
  const btnShowAll = document.getElementById(id);
  btnShowAll.classList.add(className);
};
const removeClass = (id, className) => {
  const btnShowAll = document.getElementById(id);
  btnShowAll.classList.remove(className);
};

const showDetailsButton = (id) => {
  // console.log('show details ', id);
  showDetails(id);
};

const showDetails = async (id) => {
  console.log('show details ', id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log('Phone Details ', phone);
  handleDetails(phone);
};
const handleDetails = (phone) => {
  const container = document.getElementById('phone-details-container');
  container.innerHTML = `
          <div class="card">
                <figure>
                  <img
                    src="${phone.image}"
                    alt="Movie" />
                </figure>
                <div class="py-5">
                  <h2 class="font-bold uppercase text-black">${
                    phone.name
                  }</h2>                 
                </div>
          </div>
          <ul class="flex flex-col gap-2 justify-start text-gray-500">
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="currentColor" d="M960 128q70 0 158 8t176 28t168 53t132 85q31 30 50 65t20 81v1152q0 45-19 80t-51 66q-52 51-131 84t-168 54t-177 28t-158 8q-70 0-158-8t-176-28t-168-53t-132-85q-31-30-50-65t-20-81V448q0-45 19-80t51-66q52-51 131-84t168-54t177-28t158-8m0 128q-51 0-106 3t-111 12t-110 22t-102 33q-15 6-40 18t-49 29t-41 35t-17 40q0 8 3 15t8 14q21 32 60 56t89 42t106 30t112 20t107 11t91 4q40 0 91-3t107-11t112-20t105-31t89-42t61-56q5-7 8-14t3-15q0-20-17-39t-41-36t-49-28t-40-19q-48-19-102-32t-109-22t-111-12t-107-4m0 1536q51 0 106-3t112-12t110-22t101-33q15-6 40-18t49-29t41-35t17-40v-194q-57 38-129 63t-149 40t-154 21t-144 6t-144-6t-154-21t-149-40t-129-63v194q0 21 17 40t41 35t49 28t40 19q47 20 101 33t110 21t111 12t107 4m0-384q51 0 106-3t112-12t110-22t101-33q15-6 40-18t49-29t41-35t17-40v-194q-57 38-129 63t-149 40t-154 21t-144 6t-144-6t-154-21t-149-40t-129-63v194q0 21 17 40t41 35t49 28t40 19q47 20 101 33t110 21t111 12t107 4m0-384q52 0 107-3t110-12t110-22t102-33q15-6 40-18t49-29t41-35t17-40V638q-57 37-128 62t-149 40t-155 21t-144 7q-67 0-144-6t-154-22t-149-40t-129-62v194q0 20 17 39t41 36t49 28t40 19q48 20 102 33t109 21t111 12t107 4"/></svg>
              ${phone.mainFeatures.storage}
            </li>
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" d="M6 11.5h3m-5.5 3h8a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/></svg>
              ${phone.mainFeatures.displaySize}
            </li>
            <li class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 4v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V8a1 1 0 0 0-.293-.707l-5-5A1 1 0 0 0 14 2H6c-1.103 0-2 .897-2 2m14 4.414L18.001 20H6V4h7.586z"
                />
                <path fill="currentColor" d="M8 6h2v4H8zm4 0h2v4h-2z" />
              </svg>
              ${phone.mainFeatures.memory}
            </li>
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 13.885q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6z"/></svg>
             ${phone?.releaseDate || 'Not Available'}
            </li>
            <li class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    d="M12 18h.01m-2.838-2.828a4 4 0 0 1 5.656 0m-8.485-2.829a8 8 0 0 1 11.314 0"
                  />
                  <path d="M3.515 9.515c4.686-4.687 12.284-4.687 17 0" />
                </g>
              </svg>
              ${phone.others?.WLAN || 'Not Available'}
            </li>
            <li class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12m11.905-5.882l.041.03l1.455 1.095l.034.026c.237.178.475.357.648.53c.194.197.417.495.417.919c0 .423-.223.721-.417.917a6 6 0 0 1-.648.531l-.034.026L12.248 12l2.403 1.808l.034.026c.237.177.475.357.648.53c.194.196.417.495.417.918s-.223.722-.417.918a6 6 0 0 1-.648.531l-.034.026l-1.455 1.094l-.041.031c-.345.26-.668.503-.945.654c-.283.154-.75.342-1.245.094c-.493-.247-.623-.733-.67-1.052c-.045-.312-.045-.717-.045-1.15v-2.827l-1.77 1.475a.75.75 0 0 1-.96-1.152L9.828 12L7.52 10.076a.75.75 0 0 1 .96-1.152l1.77 1.475V7.572c0-.433 0-.838.046-1.15c.046-.32.176-.805.67-1.052c.494-.248.96-.06 1.244.094c.277.151.6.394.945.654m-1.405 7.385v2.874c0 .286 0 .503.006.673c.138-.097.312-.227.539-.398l1.454-1.094a17 17 0 0 0 .36-.276l-.026-.02c-.09-.072-.198-.153-.334-.255zm-.34 3.755l.004-.002zm.387.189l.001.004zm-.047-6.95V7.623c0-.286 0-.503.006-.673c.138.097.312.227.539.397l1.454 1.095a16 16 0 0 1 .36.276a9 9 0 0 1-.36.276zm.048-3.948l-.001.004zm-.384.195"
                  clip-rule="evenodd"
                />
              </svg>
              ${phone.others?.Bluetooth || 'Not Available'}
            </li>
            <li class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 12a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z" />
                  <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                  <path
                    stroke-linecap="round"
                    d="M2 12h2m16 0h2M12 4V2m0 20v-2"
                  />
                </g>
              </svg>
              ${phone.others?.GPS || 'Not Available'}
            </li>
          </ul>

          <!-- Close Button -->
          <div class="modal-action">
            <form method="dialog">
              <button class="px-3 py-2 w-full text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">Close</button>
            </form>
          </div>
  `;
};

enableDisableButton();
loadPhones();
