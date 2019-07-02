document.addEventListener("DOMContentLoaded", event => {
    // const app = firebase.app();
    console.log(firebase)
    const db = firebase.firestore();
    // table name and id
    const myMovies = db.collection('movies').doc('1')

    // query from firestore
    const myProducts = db.collection('products');
    const queryProduct = myProducts.where('price', '>', 10).orderBy('price', 'desc')
    queryProduct.get()
        .then(products => {
            products.forEach(doc => {
                data = doc.data()
                const node = document.createElement(`li`)
                const childNode = document.createTextNode(`${data.Name} at ${data.price} <br>`)
                node.appendChild(childNode)
                document.querySelector('#product').appendChild(node)
            });
        })
    // fetch data

    /*
    myMovies.get()
        .then(doc => {
            const data = doc.data();
            document.write(data.Author + `<br>`)
            document.write(data.Movie_Name)
        }) */

    // Real time update
    myMovies.onSnapshot(
        doc => {
            const data = doc.data();
            document.querySelector('#title').innerHTML = data.Author
        }
    )

})

// Real time update ...
const updateMovie = (e) => {
    const db = firebase.firestore();
    const myMovie = db.collection('movies').doc('1')
    myMovie.update({
        Author: e.target.value
    })
}

// image upload ....
const uploadFile = (files) => {
    var storageRef = firebase.storage().ref();
    const fileRef = storageRef.child('new-imag.jpg');    
    const file = files.item(0);
    const task = fileRef.put(file)
    task.snapshot.ref.getDownloadURL()
        .then(downloadURL => {
            document.querySelector('#imgUpload').setAttribute('src', downloadURL)
        })

}

// Authentication with google
const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(res => {
            const user = res.user;
            document.write(`Hello ${user.displayName}`)
            console.log(user)
        })
        .catch(console.log)
}