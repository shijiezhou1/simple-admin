import axios from 'axios';
import fakeDataProvider from 'ra-data-fakerest';

let dataProvider = fakeDataProvider({
  posts: [
    { id: 0, title: 'Hello, world!' },
    { id: 1, title: 'FooBar' },
  ],
  comments: [
    { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
    { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
  ],
  tags:[
    { id: 0, tag: 'red' },
    { id: 1, tag: 'blue' },
    { id: 2, tag: 'green' },
  ],
  users: [
    { id: 0, username: 'joe', gender: 'male', first_name: 'John', last_name: 'Doe' },
    { id: 1, username: 'joey', gender: 'female', first_name: 'szxc', last_name: 'Kellie'},
  ]
}, true);

dataProvider = {
  ...dataProvider,
  httpGet: () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    return axios.get(url);
    // return new Promise((resolve, reject) => {
    //   axios.get(url).then(r=>{
    //     resolve(r.data);
    //   }).catch(err => {
    //     console.error(err);
    //   })
    // })
  }
}

console.log('how many there', dataProvider);

export default dataProvider;