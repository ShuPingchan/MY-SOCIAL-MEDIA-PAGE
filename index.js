const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'
//const POSTER_URL = BASE_URL + '/posters/'
const users = []

//呼叫API取得資料
axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    console.log(users)
    renderUserList(users) //新增這裡
  })
  .catch((err) => console.log(err))

const dataPanel = document.querySelector('#data-panel')

//將資料放進html template裡
function renderUserList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <button class="btn btn-outline-light btn-show-user" ><img src="${item.avatar}" width=100% data-id="${item.id}" data-toggle="modal" data-target="#user-modal"></button>
        <div class="card-body">
          <h5 class="card-title">${item.name} ${item.surname}</h5>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//在按鈕上綁定監聽器
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('img')) {
    console.log(event.target)
    showUserModal(event.target.dataset.id)  // 修改這裡
  }
})

function showUserModal(id) {
  const modalTitle = document.querySelector('#user-modal-title')
  const modalImage = document.querySelector('#user-modal-image')
  const modalAge = document.querySelector('#user-modal-age')
  const modalRegion = document.querySelector('#user-modal-region')
  const modalGender = document.querySelector('#user-modal-gender')
  const modalBirthday = document.querySelector('#user-modal-birthday')
  const modalEmail = document.querySelector('#user-modal-email')

  axios.get(INDEX_URL + '/' + id).then((response) => {
    const data = response.data
    console.log(data)
    modalTitle.innerText = data.name + " " + data.surname
    modalImage.innerHTML = `<img src="${data.avatar}" alt="user-picture" class="img-fluid">`
    modalAge.innerText = data.age
    modalRegion.innerText = data.region
    modalGender.innerText = data.gender
    modalBirthday.innerText = data.birthday
    modalEmail.innerText = data.email
  })
}


