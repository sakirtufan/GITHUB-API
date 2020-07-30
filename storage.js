class Storage{

   static getSearchedUsersFromStorage(){
      // Sorgulanmis Tüm kullanicilari alacak

      let users;

      if(localStorage.getItem('searched') === null){
         users = [];
      }
      else{
         users = JSON.parse(localStorage.getItem('searched'));
      }
      return users;
   }

   static addSearchedUserToStorage(username){
      // Sorgulanmis kullaniciyi storage ekleyecek

      let users = this.getSearchedUsersFromStorage();

      // index of  aranan username in daha önceden storageda olup olmadigini kontrol ediyoruz
      if (users.indexOf(username) === -1) {
         users.push(username);
      } 

      localStorage.setItem('searched',JSON.stringify(users));
   }

   static clearAllSearchedUsersFromStorage(){
      // sorgulanan tüm kullanicilari sil
      localStorage.removeItem('searched');
   }
}