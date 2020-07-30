// Elementleri secme

const githubForm = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github(); //Github classindan bir obje olusturduk
const ui = new UI();  //UI classindan bir obje olusturduk

eventListeners();

function eventListeners(){

   githubForm.addEventListener('submit',getData);

   clearLastUsers.addEventListener('click',clearAllSearched);

   //sayfa yüklendiginde son aramalari storageden alip arayüze yazacak
   document.addEventListener('DOMContentLoaded',getAllSearched);

}


function getData(e){
   let username = nameInput.value.trim(); //trimle sag ve soldaki gereksiz bosluklari temizledik

   if(username === ''){
      alert('lütfen gecerli bir kullanici adi girin.')
   }else{
      
      github.getGithubData(username)
      .then((response) => {

         if(response.user.message === 'Not Found'){
            ui.showError('Kullanici bulunamadi');

         }else{
            ui.addSearchedUserToUI(username);
            Storage.addSearchedUserToStorage(username);
            ui.showUserInfo(response.user);
            ui.showRepoInfo(response.repo);
         }
      })

      .catch((err) => {
         ui.showError(err);
      });
   }

   ui.clearInput(); //her aramadan sonra inputu temizliyoruz



   e.preventDefault();
}

function clearAllSearched(){
   // Tüm arananlari temizle
   if(confirm('emin misiniz?')){
      Storage.clearAllSearchedUsersFromStorage();  // Storagedan temizler
      ui.clearAllSearchedFromUI();
   }

}

function getAllSearched(){
   // Arananlari storageden al ve UI ya ekle
   let users = Storage.getSearchedUsersFromStorage();

   let result = "";

   users.forEach(user => {
      result += `<li class="list-group-item">${user}</li>`;

   });

   lastUsers.innerHTML = result;

}

